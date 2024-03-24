import { pool } from '../databases/postgres';
import { QueryResult } from 'pg';
import { TeacherRepositoryInterface } from '../interfaces/teacher-repository-interface';

class TeacherPgRepository implements TeacherRepositoryInterface {
    public async createTeacher(
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'INSERT INTO teachers ( last_name, first_name, father_name ) VALUES ( $1, $2, $3 ) RETURNING *',
            [lastName, firstName, fatherName]
        );
    }

    public async getTeacherById(id: number): Promise<QueryResult<any>> {
        return await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    }

    public async getTeachers(): Promise<QueryResult<any[]>> {
        return await pool.query('SELECT * FROM teachers');
    }

    public async updateTeacher(
        id: number,
        lastName: string,
        firstName: string,
        fatherName: string
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'UPDATE teachers SET  last_name = $1, first_name = $2, father_name = $3  WHERE id = $4 RETURNING *',
            [lastName, firstName, fatherName, id]
        );
    }

    public async deleteTeacher(id: number): Promise<void> {
        await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
    }
}

export default new TeacherPgRepository();
