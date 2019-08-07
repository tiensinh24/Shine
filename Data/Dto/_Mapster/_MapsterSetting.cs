namespace Shine.Data.Dto._Mapster {
    public static class MapsterSetting {
        public static void Load () {
            GlobalSetting.Setting ();

            ProductBuySetting.Setting ();
            ProductSellSetting.Setting ();
            EmployeeSetting.Setting ();
            SupplierSetting.Setting ();
            SupplierProductSetting.Setting ();
            CustomerSetting.Setting();
            OrderBuySetting.Setting ();
            ProductOrderSetting.Setting ();
            StorageSetting.Setting ();
            StorageProductSetting.Setting ();
            PersonProductSetting.Setting ();
        }
    }
}