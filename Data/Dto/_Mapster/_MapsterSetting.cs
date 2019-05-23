namespace Shine.Data.Dto._Mapster {
    public static class MapsterSetting {
        public static void Load() {
            GlobalSetting.Setting();

            ProductBuySetting.Setting();
            SupplierSetting.Setting();
            SupplierProductSetting.Setting();
            OrderBuySetting.Setting();
            ProductOrderSetting.Setting();
            StorageProductSetting.Setting();
        }
    }
}
