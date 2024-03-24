import { pool } from '../databases/postgres';
import { QueryResult } from 'pg';
import { StudentRepositoryInterface } from '../interfaces/student-repository-interface';

class StudentPgRepository implements StudentRepositoryInterface {
    public async createStudent(
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'INSERT INTO students ( last_name, first_name, father_name ) VALUES ( $1, $2, $3 ) RETURNING *',
            [lastName, firstName, fatherName]
        );
    }

    public async getStudentById(id: number): Promise<QueryResult<any>> {
        return await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    }

    public async getStudents(): Promise<QueryResult<any[]>> {
        return await pool.query('SELECT * FROM students');
    }

    public async updateStudent(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'UPDATE students SET last_name = $1, first_name = $2, father_name = $3 WHERE id = $4 RETURNING *',
            [lastName, firstName, fatherName, id]
        );
    }

    public async deleteStudent(id: number): Promise<void> {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
    }
}

export default new StudentPgRepository();
