<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\EmpleadoController;
use App\Http\Controllers\Api\DispositivoController;
use App\Http\Controllers\Api\UbicacionController;
use App\Http\Controllers\Api\AlertaController;

Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('empleados', EmpleadoController::class);
Route::apiResource('dispositivos', DispositivoController::class);
Route::apiResource('ubicaciones', UbicacionController::class);
Route::apiResource('alertas', AlertaController::class);
Route::apiResource('zonas', \App\Http\Controllers\Api\ZonaController::class);

// Rutas adicionales para zonas
Route::post('zonas/verificar-ubicacion', [\App\Http\Controllers\Api\ZonaController::class, 'verificarUbicacion']);
Route::get('zonas/{id}/historial', [\App\Http\Controllers\Api\ZonaController::class, 'historial']);
