import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { StorageService } from '../storage.service';
import { Observable, of, map, switchMap, iif } from 'rxjs'; 

const STORAGE_KEY = 'student_records';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private initialStudents: Student[] = [
    {id: 100, name: 'Tom', email: 'abc@gmail.com', dateOfBirth: '2000-01-01', gender: 'Male', country: 'India', courses: ['Physics', 'Maths', 'Computer']},
    {id: 101, name:'Jack', email: 'def@gmail.com', dateOfBirth: '2000-02-01', gender: 'Male', country: 'USA', courses: ['Calculus', 'English','Drama']}
  ];


  constructor(private storageService: StorageService){}

  private saveStudents(students: Student[]): Observable<void> {
    return this.storageService.set(STORAGE_KEY, students);
  }
  
  private initializeStudentsAndReturn(): Observable<Student[]> {
    return this.saveStudents(this.initialStudents).pipe(
      map(() => this.initialStudents)
    );
  }

  getStudents(): Observable<Student[]> {
    return this.storageService.get<Student[]>(STORAGE_KEY).pipe(
      switchMap(savedStudents => iif(
        () => savedStudents === null, 
        this.initializeStudentsAndReturn(),
        of(savedStudents as Student[]) 
      ))
    );
  }

  addStudent(newStudent: Omit<Student, 'id'>): Observable<void> {
    return this.getStudents().pipe(
      switchMap(currentStudents => {
        const newId = currentStudents.length > 0 ? Math.max(...currentStudents.map(s => s.id)) + 1 : 100;

        const studentToAdd: Student = {
          id: newId,
          name: newStudent.name,
          email: newStudent.email,
          dateOfBirth: newStudent.dateOfBirth,
          gender: newStudent.gender,
          country: newStudent.country,
          courses: newStudent.courses
        };

        const updatedStudents = [...currentStudents, studentToAdd];
        return this.saveStudents(updatedStudents);
      })
    );
  }

  deleteStudent(idToDelete: number): Observable<void> {
    return this.getStudents().pipe(
      switchMap(currentStudents => {
        const remainingStudents = currentStudents.filter(student => student.id !== idToDelete);
        return this.saveStudents(remainingStudents);
      })
    );
  }
}