<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
// trait_exists

Route::apiResource('books', BookController::class);