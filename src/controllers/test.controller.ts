import express, { Request, Response } from 'express'
import Test from '../models/test'
import * as testService from '../services/test.service'

const testController = express.Router()

testController.get('/', async (req: Request, response: Response) => {
  testService.getTests((error: Error, tests: Test[]) => {
    if (error) {
      return response.status(500).json({ message: error.message })
    }
    return response.status(200).json({ data: tests })
  })
})

testController.post('/', async (req: Request, response: Response) => {
  const newTest: string = req.body.name
  testService.createTest(newTest, (error: Error, testId: number) => {
    if (error) {
      return response.status(500).json({ message: error.message })
    }
    return response.status(201).json({ data: testId })
  })
})

testController.get('/:id', async (req: Request, response: Response) => {
  const testId: number = Number(req.params.id)
  testService.getOneTest(testId, (error: Error, test: string) => {
    if (error) {
      return response.status(500).json({ message: error.message })
    }
    return response.status(200).json({ data: test })
  })
})

testController.put('/:id', async (req: Request, response: Response) => {
  const test: Test = req.body
  testService.updateTest(test, (error: Error) => {
    if (error) {
      return response.status(500).json({ messsage: error })
    }
    return response.status(200).json({ data: test })
  })
})

testController.delete('/:id', async (req: Request, response: Response) => {
  const testId: number = Number(req.params.id)
  testService.deleteTest(testId, (error: Error) => {
    if (error) {
      return response.status(500).json({ messsage: error })
    }
    return response.status(200).json({})
  })
})

export default testController
