import { pool } from '../databases/postgres';
import { QueryResult } from 'pg';
import { DisciplineRepositoryInterface } from '../interfaces/discipline-repository-interface';

class DisciplinePgRepository implements DisciplineRepositoryInterface {
    public async createSubject(
        subjectName: string,
        teacherId: number
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'INSERT INTO disciplines ( subject, teacher_id ) VALUES ( $1, $2 ) RETURNING *',
            [subjectName, teacherId]
        );
    }

    public async getSubjectById(id: number): Promise<QueryResult<any>> {
        return await pool.query('SELECT * FROM disciplines WHERE id = $1', [
            id,
        ]);
    }

    public async getSubjects(): Promise<QueryResult<any[]>> {
        return await pool.query('SELECT * FROM disciplines');
    }

    public async updateSubject(
        id: number,
        subjectName: string,
        teacherId: number
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'UPDATE disciplines SET subject = $1, teacher_id = $2 WHERE id = $3 RETURNING *',
            [subjectName, teacherId, id]
        );
    }

    public async deleteSubject(id: number): Promise<void> {
        await pool.query('DELETE FROM disciplines WHERE id = $1', [id]);
    }
}

export default new DisciplinePgRepository();
