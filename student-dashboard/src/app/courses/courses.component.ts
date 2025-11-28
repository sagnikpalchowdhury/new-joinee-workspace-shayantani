import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface CourseSelection {
  mandatory: string[];
  electives: string[];
  mandatoryCount: number;
  electivesCount: number;
}

interface SelectedCourses {
    mandatory: string[];
    electives: string[];
}

interface CountryCourseDict {
  [key: string]: CourseSelection;
}

@Component({
  selector: 'course-selection',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})


export class CourseSelectionComponent implements OnChanges {
  
  @Input() selectedCountry: string = '';
  @Input() submitted: boolean = false;

  @Output() coursesChange = new EventEmitter<string[]>();
  @Output() isValidChange = new EventEmitter<boolean>();  
  
  selectedCourses: SelectedCourses = { mandatory: [], electives: [] };

  coursesDict: CountryCourseDict = {
    'India': {
      mandatory: ['Physics', 'Chemistry', 'Biology','Maths'],
      electives: ['Computer', 'Psychology'],
      mandatoryCount: 2,
      electivesCount: 1  
    },
    'UK': {
      mandatory: ['Computer', 'Bioscience', 'Geography', 'History'],
      electives: ['C#', 'Python', 'Java', 'C++'],
      mandatoryCount: 2, 
      electivesCount: 2
    },
    'USA': {
      mandatory: ['Calculus', 'English', 'Statistics', 'Economics'],
      electives: ['Art', 'Music', 'Drama'],
      mandatoryCount: 3,
      electivesCount: 1
    },
    'Canada': {
      mandatory: ['History', 'Math', 'Science'],
      electives: ['French', 'Spanish', 'Drama', 'Computer'],
      mandatoryCount: 1,
      electivesCount: 2
    },
    'Australia': {
      mandatory: ['Literature', 'Science'],
      electives: ['Sports', 'Drama'],
      mandatoryCount: 1,
      electivesCount: 1
    }
  };

  get currentCourseConfig(): CourseSelection | undefined {
    return this.coursesDict[this.selectedCountry];
  }

  get isSelectionValid(): boolean {
    const config = this.currentCourseConfig;
    if (!config) return false; 
    
    const mandatoryValid = this.selectedCourses.mandatory.length === config.mandatoryCount;
    const electivesValid = this.selectedCourses.electives.length === config.electivesCount;
    
    return mandatoryValid && electivesValid;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCountry']) {
      this.selectedCourses = { mandatory: [], electives: [] };
      this.emitChanges();
    }
    if (changes['submitted']) {
      this.isValidChange.emit(this.isSelectionValid);
    }
  }

  onCourseChange(course: string, type: 'mandatory' | 'electives', isChecked: boolean): void {
    const coursesList = this.selectedCourses[type];

    if (isChecked) {
      if (!coursesList.includes(course)) {
        coursesList.push(course);
      }
    } else {
      const index = coursesList.indexOf(course);
      if (index > -1) {
        coursesList.splice(index, 1);
      }
    }
    
    this.emitChanges();
  }
  
  private emitChanges(): void {
    const allSelectedCourses = [...this.selectedCourses.mandatory, ...this.selectedCourses.electives];
    this.coursesChange.emit(allSelectedCourses);
    
    this.isValidChange.emit(this.isSelectionValid);
  }
}