namespace Shine.Data.Helpers
{
  public static class Helpers
  {
    public static int GetQuarter(int month)
    {
      int rs = 0;

      if (month >= 1 && month <= 3)
      {
        rs = 1;
      }

      if (month >= 4 && month <= 6)
      {
        rs = 2;
      }

      if (month >= 7 && month <= 9)
      {
        rs = 3;
      }

      if (month >= 10 && month <= 12)
      {
        rs = 4;
      }

      return rs;

    }
  }
}