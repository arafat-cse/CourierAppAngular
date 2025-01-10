import { Component, OnInit } from '@angular/core';
interface Designation {
  designationId?: number;
  title: string;
  salaryRange?: string;
  isActive: boolean;
  createBy: string;
  createDate: Date;
  updateBy?: string;
  updateDate?: Date;
}
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
})
export class DesignationComponent implements OnInit {
  designations: Designation[] = []; // Array to store designations
  designation: Designation = this.resetDesignation(); // Current designation model
  editIndex: number | null = null; // Index for editing
  showList: boolean = false; // Toggle between list and form view

  constructor() {}

  ngOnInit(): void {}

  // Toggle between Designation Form and List
  toggleView(): void {
    this.showList = !this.showList;
  }

  // Create or Update a Designation
  createDesignation(): void {
    if (this.designation.title.trim() && this.designation.createBy.trim()) {
      if (this.editIndex !== null) {
        // Update existing designation
        this.designations[this.editIndex] = {
          ...this.designation,
          updateDate: new Date(), // Set update date
        };
        this.editIndex = null; // Reset edit index
      } else {
        // Add new designation
        this.designations.push({
          ...this.designation,
          createDate: new Date(), // Set create date
        });
      }
      this.designation = this.resetDesignation(); // Reset form
    }
  }

  // Edit a Designation
  editDesignation(index: number): void {
    this.designation = { ...this.designations[index] }; // Populate form with existing values
    this.editIndex = index; // Set edit index
    this.showList = false; // Show form
  }

  // Delete a Designation
  deleteDesignation(index: number): void {
    this.designations.splice(index, 1); // Remove designation
  }

  // Reset Designation Model
  resetDesignation(): Designation {
    return {
      title: '',
      salaryRange: '',
      isActive: true,
      createBy: '',
      createDate: new Date(),
    };
  }
}
