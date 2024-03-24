import { pool } from '../databases/postgres';
import { QueryResult } from 'pg';
import { GradeRepositoryInterface } from '../interfaces/grade-repository-interface';

class GradePgRepository implements GradeRepositoryInterface {
    public async createGrade(
        studentId: number,
        subjectId: number,
        grade: number | null
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'INSERT INTO grades ( student_id, subject_id, grade ) VALUES ( $1, $2, $3 ) RETURNING *',
            [studentId, subjectId, grade]
        );
    }

    public async getGradeById(id: number): Promise<QueryResult<any>> {
        return await pool.query('SELECT * FROM grades WHERE id = $1', [id]);
    }

    public async getGrades(): Promise<QueryResult<any[]>> {
        return await pool.query('SELECT * FROM grades');
    }

    public async updateGrade(
        id: number,
        studentId: number,
        subjectId: number,
        grade: number
    ): Promise<QueryResult<any>> {
        return await pool.query(
            'UPDATE grades SET student_id = $1, subject_id = $2, grade = $3 WHERE id = $4 RETURNING *',
            [studentId, subjectId, grade, id]
        );
    }

    public async deleteGrade(id: number): Promise<void> {
        await pool.query('DELETE FROM grades WHRE id = $1', [id]);
    }
}

export default new GradePgRepository();
