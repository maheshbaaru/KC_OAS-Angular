import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfirmationService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
const primeNg: any = [
  CheckboxModule,
  InputTextModule,
  InputMaskModule,
  ButtonModule,
  CardModule,
  RippleModule,
  EditorModule,
  PanelModule,
  ListboxModule,
  ToolbarModule,
  CalendarModule,
  RadioButtonModule,
  InputNumberModule,
  ConfirmDialogModule,
  TableModule,
  MultiSelectModule,
  DropdownModule,
  DialogModule,
  ContextMenuModule,
  StyleClassModule,
  DividerModule,
  ToastModule,
  PanelModule,
  DropdownModule,
  TagModule,
  FileUploadModule,
  MessageModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, primeNg],
  exports: [primeNg],
  providers: [ConfirmationService, MessageService],
})
export class PrimengModule {}
