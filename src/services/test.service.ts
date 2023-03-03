import Test from '../models/test'
import connection from '../db-config'
import { OkPacket, RowDataPacket } from 'mysql2'

export const createTest = (name: string, callback: Function) => {
  const queryString = 'INSERT INTO test (name) VALUES (?)'
  connection.query(queryString, [name], (error, result) => {
    if (error) {
      callback(error)
    }
    const insertId = (<OkPacket>result).insertId
    callback(null, insertId)
  })
}

export const getTests = (callback: Function) => {
  const queryString = 'SELECT * FROM test'
  connection.query(queryString, (error, result) => {
    if (error) {
      callback(error)
    }

    const rows = <RowDataPacket[]>result
    const tests: Test[] = []
    rows.forEach((element) => {
      const test: Test = {
        id: element.id,
        name: element.name,
      }
      tests.push(test)
    })
    callback(null, tests)
  })
}

export const getOneTest = (testId: number, callback: Function) => {
  const queryString = 'SELECT * FROM test WHERE id=?'

  connection.query(queryString, [testId], (error, result) => {
    if (error) {
      callback(error)
    }
    const row = (<RowDataPacket>result)[0]
    const test: Test = {
      id: row.id,
      name: row.name,
    }
    callback(null, test)
  })
}

export const updateTest = (test: Test, callback: Function) => {
  const queryString = 'UPDATE test SET name = ? WHERE id=?'
  connection.query(queryString, [test.name, test.id], (error) => {
    if (error) {
      callback(error)
    }
    callback(null)
  })
}

export const deleteTest = (testId: number, callback: Function) => {
  const queryString = 'DELETE FROM test WHERE id=?'
  connection.query(queryString, [testId], (error) => {
    if (error) {
      callback(error)
    }
    callback(null)
  })
}
