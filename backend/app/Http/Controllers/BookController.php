<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    //GET http://127.0.0.1:8000/api/books/
    public function index()
    {
        return Book::all();
    }

   //POST http://127.0.0.1:8000/api/books/
    public function store(Request $request)
    {   
       $request->validate([
        'title' => ['required']
       ]); 

       $book = new Book;
       $book->title = $request->input('title');
       $book->save();

       return $book;

    }

    //GET http://127.0.0.1:8000/api/books/{id}
    public function show(Book $book)
    {
        return $book;
    }

   
    public function update(Request $request, Book $book)
    {
         $request->validate([
        'title' => ['required']
       ]); 
       
    // $book = new Book;
       $book->title = $request->input('title');
       $book->save();

       return $book;
    }

    
    public function destroy(Book $book)
    {
       $book->delete();

       return response()->noContent();

       
    }
}
