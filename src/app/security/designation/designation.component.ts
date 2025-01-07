// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-designation',
//   templateUrl: './designation.component.html',
//   styleUrl: './designation.component.css'
// })
// export class DesignationComponent {

// }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designations: { name: string; status: string }[] = []; // Array to store designations with status
  designation: string = ''; // Model for input field
  status: string = 'Active'; // Default status
  editIndex: number | null = null; // Index for edit functionality

  constructor() {}

  ngOnInit(): void {}

  // Create or update a designation
  createDesignation(): void {
    if (this.designation.trim()) {
      if (this.editIndex !== null) {
        // Update existing designation
        this.designations[this.editIndex] = { name: this.designation.trim(), status: this.status };
        this.editIndex = null; // Reset edit index
      } else {
        // Add new designation
        this.designations.push({ name: this.designation.trim(), status: this.status });
      }
      this.designation = ''; // Clear input field
      this.status = 'Active'; // Reset status
    }
  }

  // Edit a designation
  editDesignation(index: number): void {
    this.designation = this.designations[index].name; // Populate input field
    this.status = this.designations[index].status; // Populate status dropdown
    this.editIndex = index; // Set index for editing
  }

  // Delete a designation
  deleteDesignation(index: number): void {
    this.designations.splice(index, 1); // Remove designation
  }

  // Toggle status between Active and Inactive
  toggleStatus(index: number): void {
    this.designations[index].status =
      this.designations[index].status === 'Active' ? 'Inactive' : 'Active';
  }
}