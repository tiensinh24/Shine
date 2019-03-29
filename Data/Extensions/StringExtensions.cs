using System;
using System.Linq;
using System.Text;

namespace Shine.Data.Extensions
{
    public static class StringExtensions
    {
        public static string ToPascalCase(this string str)
        {
            // // Replace all non-letter and non-digits with an underscore and lowercase the rest.
            // string sample = string.Join("", str?.Select(c => Char.IsLetterOrDigit(c) ? c.ToString().ToLower() : "_").ToArray());

            // // Split the resulting string by underscore
            // // Select first character, uppercase it and concatenate with the rest of the string
            // var arr = sample?
            //     .Split(new [] { '_' }, StringSplitOptions.RemoveEmptyEntries)
            //     .Select(s => $"{s.Substring(0, 1).ToUpper()}{s.Substring(1)}");

            // // Join the resulting collection
            // sample = string.Join("", arr);

            if (!string.IsNullOrEmpty(str))
            {
                var firstChar = str.Substring(0, 1).ToUpper();
                var restChars = str.Substring(1);

                var builder = new StringBuilder();
                builder.Append(firstChar);
                builder.Append(restChars);

                // var rs = firstChar + restChars;

                return builder.ToString();
            }
            return null;

        }
    }
}
