<template>
  <MainCard>
    <template v-slot:title>
      <m-back-icon />
      {{ title }}
    </template>
      <v-tabs background-color="grey lighten-4 mt-0 pt-0">
        <v-tab>
          <v-icon right>
            fa-user
          </v-icon>
          اطلاعات کلی
        </v-tab>
        <v-tab v-if="id">
          <v-icon right>
            fa-lock
          </v-icon>
          دسترسی‌ها
        </v-tab>
        <v-tab v-if="id">
          <v-icon right>
            fa-store
          </v-icon>
          خریدها
        </v-tab>
        <v-tab-item>
          <v-card  class="tab-item-wrapper overflow-y-auto"  height="60vh" flat>
            <v-card-text>
              <v-form v-model="valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <m-text-field v-model="center.persianName" label="نام مرکز" required/>
                  </v-col>
                  <v-col cols="12" md="6">
                    <m-text-field v-model="center.name" label="نام مرکز به انگلیسی (بدون فاصله)" required :rules="[rules.englishName]"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <m-text-field v-model="center.site" label="آدرس وب سایت" :rules="[rules.website]" />
                  </v-col>
                </v-row>
                <!-- <v-row>
                   <v-col cols="12" md="6">
                     <v-checkbox v-model="center.dayBased" label="در هر روز برنامه مشخص شده بر اساس روز اول شروع لود شود."></v-checkbox>
                     <v-checkbox v-model="center.dayEnded" label="بعد از اتمام برنامه یک روز برنامه روز بعد لود نشود."></v-checkbox>
                  </v-col>
                </v-row> -->
              </v-form>
              <m-button-save @submit="submit()"></m-button-save>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item >
          <v-card  flat lass="tab-item-wrapper overflow-y-auto">
            <v-card-text>
              <v-row>
                <v-col>
                  <component
                    is= "m-autocomplete"
                    v-model="module"
                    :items="this.modules"
                    item-text="subject"
                    item-value="Id"
                    v-bind="$attrs"
                    return-object
                    label="انتخاب ماژول"
                  />
                </v-col>
                <v-col>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="secondary mx-3 add-button mt-6"
                        fab
                        dark
                        small
                        primary
                        v-bind="attrs"
                        v-on="on"
                        @click="addPermission()">
                        <v-icon dark> fa-plus </v-icon>
                      </v-btn>
                    </template>
                    <span>افزودن</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <br>
              <v-divider></v-divider>
              <br>
              <h3>دسترسی های فعلی</h3>
              <br>
              <m-data-table
                :headers="
                [{ text: 'نام ماژول', value: 'subject' , align: 'center' },
                 { text: 'حذف', value: 'action', sortable: false, align: 'center' }]"
                :items="this.centerPermissions"
                loading-text="در حال لود اطلاعات..."
                class="elevation-5 text-center"
                hide-default-footer
                dense
              >
                <template #[`item.action`]="{ item }">
                  <m-tooltip-icon
                    icon="fa-trash"
                    title="حذف"
                    @click="showDeletePermissionDialog(item.id)"
                  />
                </template>
              </m-data-table>


            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item >
          <v-card  flat lass="tab-item-wrapper overflow-y-auto">
            <v-card-text>
              <v-btn class="primary ma-4 pr-5 pl-5" :to="'/shopping/product/center?centerId='+id"><v-icon small dark class="ml-2">fa-solid fa-plus</v-icon>افزودن</v-btn>
              <br>
              <m-data-table
                :headers="
                [{ text: 'نام بسته', value: 'product.faName' , align: 'center' },
                 { text: 'تعداد', value: 'number' , align: 'center' },
                 { text: 'مصرف شده', value: 'usage' , align: 'center' },
                 { text: 'تاریخ ایجاد', value: 'createDate' , align: 'center' },
                 { text: 'تاریخ انقضا', value: 'expireDate' , align: 'center' },
                 { text: 'منقضی شده', value: 'expired' , align: 'center' },
                 { text: 'ویرایش', value: 'action', sortable: false, align: 'center' }]"
                :items="centerProducts"
                loading-text="در حال لود اطلاعات..."
                class="elevation-5 text-center"
                hide-default-footer
                dense
              >
                <template #[`item.expired`]="{ item }">
                  <v-simple-checkbox v-model="item.expired" class="green--text" disabled />
                </template>
                <template #[`item.action`]="{ item }">
                  <m-tooltip-icon
                    icon="fa-pencil"
                    title="ویرایش"
                    :to="'/shopping/product/center?id='+item.id"
                  />
                </template>
              </m-data-table>


            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    <DeleteDialog ref="dialogDeletePermission" @deleted="onPermissionDelete"/>

  </MainCard>
</template>

<script lang="ts">
import {Vue, Component, mixins, Watch} from 'nuxt-property-decorator'
import { Validation } from '~/mixins'
import {CenterPermissionsService, CenterService, ScheduleService} from '@/services'
import {Center, PermissionModule, UserProduct} from "@/models"
import MUserSelect from "~/components/controls/m-user-select.vue";
import DeleteDialog from "~/components/dialogs/deleteDialog.vue";
import {UserProductService} from "~/services/sopping";
@Component({
  components: {MUserSelect}
})
export default class OrganizationViewPage extends mixins(Validation) {
  $refs !: {
    dialogDeletePermission: DeleteDialog;
  };
  center: Center=this.newCenter()
  modules: PermissionModule[]|undefined=undefined
  valid: boolean = false
  module: PermissionModule|undefined=undefined
  centerPermissions: PermissionModule[]=[]
  centerProducts: UserProduct[]=[]

  newCenter(){
    return {
      id:0,
      name:'',
      site: '',
      persianName: '',
      userId: '',
      userName: '',
    } as Center
  }
  initializePage(){
    if (!this.isNew) {
      new CenterService().getById(this.id).then((c) => {
        this.center = c
      })
    }else{
      this.center = this.newCenter();
    }
    if(this.id) {
      new CenterPermissionsService().getAllModules().then((c) => {
        this.modules = c;
      })
      this.getCenterPermissions();
      this.getCenterProducts();
    }
  }
  created() {
    this.initializePage()
  }
  @Watch('$route.query.id')
  cahngeId(){
    this.initializePage()
  }
  submit() {
    if (this.valid) {
      if (this.isNew) {
        new CenterService().insert(this.center).then(() => {
          this.$store.dispatch('alert/success', 'با موفقیت ذخیره شد.')
          this.$router.back()
        })
      } else {
        new CenterService().update(this.center).then(() => {
          this.$store.dispatch('alert/success', 'با موفقیت ذخیره شد.')
          this.$router.back()
        })
      }
    }
  }

  get id() {
    return (this.$route.query.id as unknown) as number
  }

  get isNew() {
    return !this.id
  }

  get title() {
    if (this.isNew) {
      return 'مرکز جدید'
    } else {
      return `ویرایش مرکز «${this.center.persianName}»`
    }
  }

  onPermissionDelete(){
    let id = this.$refs.dialogDeletePermission.Id;
    new CenterPermissionsService().deletePermission(
      id
    ).then(()=>{
      this.$store.dispatch('alert/success', 'دسترسی با موفقیت حذف شد.')
      this.getCenterPermissions()
    })
  }
  addPermission(){
    console.log(this.module)
    if(this.module?.subject)
      new CenterPermissionsService().insert(this.id,this.module?.subject).then(() => {
        this.$store.dispatch('alert/success', 'با موفقیت به دسترسی های مرکز افزوده شد.')
        this.getCenterPermissions()
      })
  }
  getCenterPermissions() {
    new CenterPermissionsService().getCenterModules(this.id).then((c)=>
    {
      this.centerPermissions=c;
    })
  }
  showDeletePermissionDialog(id: number){
    this.$refs.dialogDeletePermission.Id = id;
    this.$refs.dialogDeletePermission.show();
  }
  getCenterProducts(){
    new UserProductService().getCenterProducts(this.id).then((products)=>{
      this.centerProducts = products;
    })
  }
}
</script>
