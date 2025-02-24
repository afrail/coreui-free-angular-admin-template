import {Component, OnInit} from '@angular/core';
import { ItemCategory } from '../../model/item-category';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonsetupDetails} from "../../model/commonsetup-details";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {CommonsetupDetailsService} from "../../service/commonsetup-details.service";
import {ItemMasterService} from "../../service/item-master.service";
import {ItemMaster} from "../../model/item-master";
import {MessageService} from "primeng/api";
import {ItemCategoryService} from "../../service/item-category.service";
import {TYPE, UNIT} from "../../../../constants/constant";

@Component({
  selector: 'app-item-master',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        CheckboxModule,
        InputTextModule,
        DropdownModule,
        DialogModule,
        NgIf,
        TableModule,
        ToastModule,
        TooltipModule
    ],
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.scss'
})
export class ItemMasterComponent implements OnInit{
    itemMasterForm: FormGroup;
    itemMasterList: any;
    totalRecords: any;
    model: ItemMaster = new ItemMaster();
    item: {};
    deleteProductDialog: boolean = false;
    product = { roles: null };
    editValue: boolean;
    searchLoader: boolean = false;
    disableDelete: boolean;
    itemCategoriesDropdown: ItemCategory[] = [];
    itemTypeList: CommonsetupDetails[] = [];
    unitList: CommonsetupDetails[] = [];

    constructor(
        private fb: FormBuilder,
        private modelService: ItemMasterService,
        private categoryService: ItemCategoryService,
        private unitService: CommonsetupDetailsService,
        private itemTypeService: CommonsetupDetailsService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
        this.setFormInitValue();
        this.getPageableModelList();
        this.getCategoryList();
        this.getUnitList();
        this.getItemTypeList();
    }

    getPageableModelList(page: number = 0, size: number = 500): any {
        this.modelService.getListWithPagination(page, size).subscribe(res => {
            // console.log(res.data.content)
            this.itemMasterList = res.data.content;
            this.totalRecords = res.data.totalElements;
        });
    }

    getCategoryList(): void {
        this.categoryService.getActiveList().subscribe(res => {
            // console.log(res.data)
            this.itemCategoriesDropdown = res.data;
        });
    }

    getUnitList(): void {
        this.unitService.getListByMasterId(UNIT).subscribe(res => {
            // console.log(res.data)
            this.unitList = res.data;
        });
    }

    getItemTypeList(): void {
        this.itemTypeService.getListByMasterId(TYPE).subscribe(res => {
            // console.log(res.data)
            this.itemTypeList = res.data;
        });
    }

    setFormInitValue(): any {
        this.itemMasterForm = this.fb.group({
            name: ['', ''],
            banglaName: [''],
            code: ['', ''],
            category: ['', ''],
            unit: ['', ''],
            price: ['', ''],
            availableStock: ['', ''],
            winingStock: ['', ''],
            itemType: ['', ''],
            active: [true],
        });
    }

    generateModel(isCreate: boolean): any {
        if (isCreate) {
            this.model.id = undefined;
        }
        this.model.name = this.itemMasterForm.value.name;
        this.model.banglaName = this.itemMasterForm.value.banglaName;
        this.model.code = this.itemMasterForm.value.code;
        this.model.category = this.itemMasterForm.value?.category;
        this.model.unit = this.itemMasterForm.value?.unit;
        this.model.price = this.itemMasterForm.value.price;
        this.model.availableStock = this.itemMasterForm.value.availableStock;
        this.model.winingStock = this.itemMasterForm.value.winingStock;
        this.model.itemType = this.itemMasterForm.value?.itemType;
        this.model.active = this.itemMasterForm.value?.active;
    }

    onSubmit(): any {
        this.generateModel(true);
        this.searchLoader = true;
        this.modelService.create(this.model).subscribe(
            (res) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully!' });
                this.getPageableModelList();
                this.onReset();
                this.searchLoader = false;
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data.' });
            }
        );
    }

    update(): any {
        this.generateModel(false);
        this.searchLoader = true;
        console.log(this.model);
        this.modelService.update(this.model).subscribe(res => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated successfully!' });
            this.getPageableModelList();
            this.onReset();
            this.searchLoader = false;
        },(error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data.' });
        });
    }

    onReset(): void {
        this.itemMasterForm.reset();
        this.editValue = false;
        this.disableDelete = false;
    }

    editItem(res: ItemMaster) {
        this.disableDelete = true;
        this.editValue = true;
        this.model = res;
        // console.log(this.model)
        const selectCategory = res.category == null ? '' : this.itemCategoriesDropdown.find(model => model.id === res.category?.id);
        const selectUnit = res.unit == null ? '' : this.unitList.find(model => model.id === res.unit?.id);
        const selectItemType = res.itemType == null ? '' : this.itemTypeList.find(model => model.id === res.itemType?.id);
        this.itemMasterForm.setValue({
            name: res.name,
            banglaName: res.banglaName,
            code: res.code,
            category: selectCategory,
            unit: selectUnit,
            price: res.price,
            availableStock: res.availableStock,
            winingStock: res.winingStock,
            itemType: selectItemType,
            active: res.active,
        });
    }


    deleteItem(item: ItemMaster): any {
        this.deleteProductDialog = true;
        this.item = { ...item };
    }

    confirmDelete(item: ItemMaster  ) {
        this.deleteProductDialog = false;
        this.itemMasterList = this.itemMasterList.filter((i: { id: number; }) => i.id !== item.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.item = {};

        this.modelService.delete(item).subscribe(res => {
            console.log(res.data);
            this.getPageableModelList();

        }, error => {
            console.log(error);
        });
    }

}
