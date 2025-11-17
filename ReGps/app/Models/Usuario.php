<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'UsuarioID';
    
    protected $fillable = [
        'Nombre',
        'Email',
        'Contraseña',
        'Rol',
        'Estado'
    ];
    
    protected $hidden = [
        'Contraseña'
    ];
    
    public function empleado()
    {
        return $this->hasOne(Empleado::class, 'UsuarioID');
    }
}
