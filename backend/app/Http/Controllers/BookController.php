<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // http://127.0.0.1:8000/api/books/
    public function index()
    {
        return Book::all();
    }

   
    public function store(Request $request)
    {
        //
    }

    // http://127.0.0.1:8000/api/books/{id}
    public function show(Book $book)
    {
        return $book;
    }

   
    public function update(Request $request, Book $book)
    {
        //
    }

    
    public function destroy(Book $book)
    {
        //
    }
}
