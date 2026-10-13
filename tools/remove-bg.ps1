# מסיר את רקע התמונה מקבצי הלוגו ומייצר PNG שקוף לאתר.
#   public\logo-sle-header.png — גרסה כהה על רקע שקוף (להדר הבהיר)
#   public\logo-sle-footer.png — גרסה בהירה על רקע שקוף (לפוטר הכהה)
# להרצה מתיקיית הפרויקט: powershell -ExecutionPolicy Bypass -File tools\remove-bg.ps1

$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public static class BgRemover {
  public static string Process(string src, string dst, int cx, int cy, int cw, int ch, int outW, int inner, int outer) {
    using (Bitmap s = new Bitmap(src)) {
      if (cw <= 0) cw = s.Width;
      if (ch <= 0) ch = s.Height;
      cx = Math.Max(0, cx); cy = Math.Max(0, cy);
      if (cx + cw > s.Width) cw = s.Width - cx;
      if (cy + ch > s.Height) ch = s.Height - cy;
      long sr=0, sg=0, sb=0;
      int[,] pts = new int[,] {{cx+5,cy+5},{cx+cw-6,cy+5},{cx+5,cy+ch-6},{cx+cw-6,cy+ch-6}};
      for (int i=0;i<4;i++){ Color c=s.GetPixel(pts[i,0],pts[i,1]); sr+=c.R; sg+=c.G; sb+=c.B; }
      double br=sr/4.0, bgc=sg/4.0, bb=sb/4.0;
      using (Bitmap d = new Bitmap(cw, ch, PixelFormat.Format32bppArgb)) {
        long opaque=0; double range = (double)(outer-inner);
        for (int yy=0; yy<ch; yy++) {
          for (int xx=0; xx<cw; xx++) {
            Color c = s.GetPixel(cx+xx, cy+yy);
            double dr=c.R-br, dg=c.G-bgc, db=c.B-bb;
            double dist = Math.Sqrt(dr*dr+dg*dg+db*db);
            int a = dist<=inner ? 0 : (dist>=outer ? 255 : (int)((dist-inner)*255.0/range));
            if (a>127) opaque++;
            d.SetPixel(xx,yy,Color.FromArgb(a,c.R,c.G,c.B));
          }
        }
        int outH = (int)Math.Round((double)ch*outW/cw);
        using (Bitmap r = new Bitmap(outW, outH, PixelFormat.Format32bppArgb)) {
          using (Graphics g = Graphics.FromImage(r)) {
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.DrawImage(d, 0, 0, outW, outH);
          }
          r.Save(dst, ImageFormat.Png);
        }
        double pct = 100.0*opaque/(cw*(double)ch);
        return string.Format("crop={0}x{1} bg=({2:F0},{3:F0},{4:F0}) opaque={5:F1}% saved {6} ({7}x{8})", cw, ch, br,bgc,bb, pct, dst, outW, outH);
      }
    }
  }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing
[BgRemover]::Process("public\logo-sle.jpg", "public\logo-sle-header.png", 0, 0, 0, 0, 640, 30, 110)
[BgRemover]::Process("public\logo-sle-versions.png", "public\logo-sle-footer.png", 0, 455, 2007, 328, 480, 30, 110)
