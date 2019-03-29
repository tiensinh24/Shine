using System;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;

namespace Shine.Data.Helpers
{
    public static class ExpressionHelpers
    {
        /// <summary>
        ///     Returns the name of the specified property of the specified type.
        /// </summary>
        /// <typeparam name="T">
        ///     The type the property is a member of.
        /// </typeparam>
        /// <param name="property">
        ///     The property.
        /// </param>
        /// <returns>
        ///     The property name.
        /// </returns>
        public static string GetPropertyName<T>(Expression<Func<T, object>> property)
        {
            LambdaExpression lambda = (LambdaExpression) property;
            MemberExpression memberExpression;

            if (lambda.Body is UnaryExpression)
            {
                UnaryExpression unaryExpression = (UnaryExpression) (lambda.Body);
                memberExpression = (MemberExpression) (unaryExpression.Operand);
            }
            else
            {
                memberExpression = (MemberExpression) (lambda.Body);
            }

            return ((PropertyInfo) memberExpression.Member).Name;
        }

        // TODO: this method get performance hit
        public static async Task<Expression<Func<T, object>>> GetExpressionFromString<T>(string str) where T : class
        {

            if (str != null)
            {
                var options = ScriptOptions.Default.AddReferences(typeof(T).Assembly);

                Expression<Func<T, object>> expression =
                    await CSharpScript.EvaluateAsync<Expression<Func<T, object>>>(str, options);

                return expression;
            }
            return null;
        }

    }
}
