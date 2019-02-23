using FastExpressionCompiler;

using Mapster;

using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class GlobalSetting
    {
        public static void Setting()
        {
            TypeAdapterConfig.GlobalSettings.Compiler = exp => exp.CompileFast();
        }

    }
}
