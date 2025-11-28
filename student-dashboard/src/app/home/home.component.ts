import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core'; 
import { Student } from '../student/student.model';
import { StudentService } from '../student/student.service';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription, tap } from 'rxjs'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatButtonModule
  ], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit, OnDestroy {
  
  students: Student[] = []; 
  private studentsSubscription: Subscription = new Subscription();
  isLoading = signal(false);
  displayedColumns: string[] = ['id', 'name', 'email', 'dateOfBirth', 'gender', 'country', 'courses','delete'];

  constructor( private studentService: StudentService){}

  ngOnInit(): void{
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading.set(true);

    this.studentsSubscription.add(
    this.studentService.getStudents()
      .subscribe({
        next: (data: Student[]) => {
          console.log('printing 1')
          this.students = data;
          this.isLoading.set(false);
          console.log('printing 2')
        },
        error: (error) => { 
          console.error('Error loading students', error);
          this.isLoading.set(false);
        }
      }) 
  );
  }

  onDeleteStudent(id: number): void {
    if (confirm(`Are you sure you want to delete student with ID ${id}?`)) {
        this.isLoading.set(true); 
        
        this.studentsSubscription.add(
          this.studentService.deleteStudent(id).subscribe({
            next: () => {
              console.log('deleted')
              this.loadStudents(); 
            },
            error: (e) => {
               console.error('Deletion failed', e);
               this.isLoading.set(false); 
            }
          })
        );
    }
  }
  
  ngOnDestroy(): void {
    this.studentsSubscription.unsubscribe();
  }
}