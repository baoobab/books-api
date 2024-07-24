import {Request, Response} from 'express';
import {ERRORS_MESSAGES} from "../shared/enums";
import {createBook, deleteBook, getAllBooks, getBookById, updateBook} from "../services/books.service";
import {CreateBookDto} from "../dto/create-book.dto";
import {Book} from "../models/books.model";
import {UpdateBookDto} from "../dto/update-book.dto";


export const create = async (req: Request, res: Response) => {
  try {
    const bookData: CreateBookDto = req.body
    const newBook: Book = await createBook(bookData)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR
    })
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const books: Book[] = await getAllBooks()
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const book: Book = await getBookById(Number(id))
    if (!book) {
      return res.status(404).json({
        message: ERRORS_MESSAGES.NOT_FOUND,
        status: 404
      })
    }
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}

export const update = async (req: Request, res: Response) => {
  const {id} = req.params
  const bookData: UpdateBookDto = req.body
  try {
    const updatedBook: Book = await updateBook(Number(id), bookData)
    if (!updatedBook) {
      return res.status(404).json({
        message: ERRORS_MESSAGES.NOT_FOUND,
        status: 404
      })
    }
    res.status(200).json(updatedBook)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}

export const remove = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const deletedBook: Book = await deleteBook(Number(id))
    if (!deletedBook) {
      return res.status(404).json({
        message: ERRORS_MESSAGES.NOT_FOUND,
        status: 404
      })
    }
    res.status(200).json(deletedBook)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}