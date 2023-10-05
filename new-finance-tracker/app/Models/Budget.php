<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = ["category_name", "amount", "user_id"];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'budget_id', 'id');
    }
}
