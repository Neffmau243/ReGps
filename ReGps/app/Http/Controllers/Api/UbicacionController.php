<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ubicacion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UbicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $ubicaciones = Ubicacion::with('dispositivo.empleado')->get();
        return response()->json($ubicaciones);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'DispositivoID' => 'required|exists:dispositivos,DispositivoID',
            'Latitud' => 'required|numeric|between:-90,90',
            'Longitud' => 'required|numeric|between:-180,180',
            'Velocidad' => 'nullable|numeric|min:0|max:200',
            'Direccion' => 'nullable|string',
            'FechaHora' => 'required|date|before_or_equal:now'
        ]);

        $ubicacion = Ubicacion::create($validated);
        
        // Verificar geofencing automáticamente
        $this->verificarGeofencing($ubicacion);
        
        return response()->json($ubicacion, 201);
    }
    
    /**
     * Verificar si la ubicación está en alguna zona y registrar eventos
     */
    private function verificarGeofencing($ubicacion)
    {
        $dispositivo = \App\Models\Dispositivo::with('empleado')->find($ubicacion->DispositivoID);
        
        if (!$dispositivo || !$dispositivo->empleado) {
            return;
        }
        
        $zonasActivas = \App\Models\Zona::where('Estado', 'Activo')->get();
        
        foreach ($zonasActivas as $zona) {
            $estaEnZona = $zona->contienePunto($ubicacion->Latitud, $ubicacion->Longitud);
            
            // Buscar última entrada sin salida
            $ultimaEntrada = \App\Models\HistorialZona::where('ZonaID', $zona->ZonaID)
                ->where('EmpleadoID', $dispositivo->EmpleadoID)
                ->where('TipoEvento', 'Entrada')
                ->whereNull('TiempoPermanencia')
                ->latest('FechaHoraEvento')
                ->first();
            
            if ($estaEnZona && !$ultimaEntrada) {
                // Registrar entrada
                \App\Models\HistorialZona::create([
                    'ZonaID' => $zona->ZonaID,
                    'EmpleadoID' => $dispositivo->EmpleadoID,
                    'DispositivoID' => $dispositivo->DispositivoID,
                    'TipoEvento' => 'Entrada',
                    'FechaHoraEvento' => $ubicacion->FechaHora,
                    'Latitud' => $ubicacion->Latitud,
                    'Longitud' => $ubicacion->Longitud,
                    'AlertaGenerada' => $zona->TipoZona === 'Zona Restringida'
                ]);
                
                // Generar alerta si es zona restringida
                if ($zona->TipoZona === 'Zona Restringida') {
                    \App\Models\Alerta::create([
                        'DispositivoID' => $dispositivo->DispositivoID,
                        'TipoAlerta' => 'Zona',
                        'Descripcion' => "Entrada a zona restringida: {$zona->Nombre}",
                        'FechaHora' => $ubicacion->FechaHora,
                        'Estado' => 'Pendiente'
                    ]);
                }
            } elseif (!$estaEnZona && $ultimaEntrada) {
                // Registrar salida y calcular tiempo de permanencia
                $tiempoPermanencia = $ubicacion->FechaHora->diffInMinutes($ultimaEntrada->FechaHoraEvento);
                
                $ultimaEntrada->update(['TiempoPermanencia' => $tiempoPermanencia]);
                
                \App\Models\HistorialZona::create([
                    'ZonaID' => $zona->ZonaID,
                    'EmpleadoID' => $dispositivo->EmpleadoID,
                    'DispositivoID' => $dispositivo->DispositivoID,
                    'TipoEvento' => 'Salida',
                    'FechaHoraEvento' => $ubicacion->FechaHora,
                    'Latitud' => $ubicacion->Latitud,
                    'Longitud' => $ubicacion->Longitud,
                    'TiempoPermanencia' => $tiempoPermanencia,
                    'AlertaGenerada' => $zona->TipoZona === 'Zona Permitida'
                ]);
                
                // Generar alerta si sale de zona permitida
                if ($zona->TipoZona === 'Zona Permitida') {
                    \App\Models\Alerta::create([
                        'DispositivoID' => $dispositivo->DispositivoID,
                        'TipoAlerta' => 'Zona',
                        'Descripcion' => "Salida de zona permitida: {$zona->Nombre}",
                        'FechaHora' => $ubicacion->FechaHora,
                        'Estado' => 'Pendiente'
                    ]);
                }
            }
        }
        
        // Verificar exceso de velocidad
        if ($ubicacion->Velocidad && $ubicacion->Velocidad > 80) {
            \App\Models\Alerta::create([
                'DispositivoID' => $dispositivo->DispositivoID,
                'TipoAlerta' => 'Velocidad',
                'Descripcion' => "Exceso de velocidad: {$ubicacion->Velocidad} km/h",
                'FechaHora' => $ubicacion->FechaHora,
                'Estado' => 'Pendiente'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $ubicacion = Ubicacion::with('dispositivo.empleado')->findOrFail($id);
        return response()->json($ubicacion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $ubicacion = Ubicacion::findOrFail($id);
        
        $validated = $request->validate([
            'DispositivoID' => 'exists:dispositivos,DispositivoID',
            'Latitud' => 'numeric|between:-90,90',
            'Longitud' => 'numeric|between:-180,180',
            'Velocidad' => 'nullable|numeric|min:0',
            'Direccion' => 'nullable|string',
            'FechaHora' => 'date'
        ]);

        $ubicacion->update($validated);
        return response()->json($ubicacion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $ubicacion = Ubicacion::findOrFail($id);
        $ubicacion->delete();
        return response()->json(['message' => 'Ubicación eliminada correctamente']);
    }
}
