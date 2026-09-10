from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "drawio" / "pdf" / "construmarket-der.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = landscape(A3)
NAVY = colors.HexColor("#12324A")
BLUE = colors.HexColor("#176B87")
ORANGE = colors.HexColor("#F28C28")
PALE = colors.HexColor("#F3F7FA")
LINE = colors.HexColor("#AFC1CC")
TEXT = colors.HexColor("#243746")

tables = {
    "user_roles": (45, 455, 240, [
        ("PK", "id", "INT UNSIGNED"), ("UQ", "name", "VARCHAR(30)")
    ]),
    "users": (360, 420, 300, [
        ("PK", "id", "INT UNSIGNED"), ("", "first_name", "VARCHAR(80)"),
        ("", "last_name", "VARCHAR(80)"), ("UQ", "email", "VARCHAR(150)"),
        ("", "phone", "VARCHAR(30) NULL"), ("", "password", "VARCHAR(100)"),
        ("", "image", "VARCHAR(255)"), ("FK", "role_id", "INT UNSIGNED"),
        ("", "created_at / updated_at", "DATETIME")
    ]),
    "categories": (45, 270, 240, [
        ("PK", "id", "INT UNSIGNED"), ("UQ", "name", "VARCHAR(80)")
    ]),
    "brands": (45, 85, 240, [
        ("PK", "id", "INT UNSIGNED"), ("UQ", "name", "VARCHAR(80)")
    ]),
    "products": (385, 70, 330, [
        ("PK", "id", "INT UNSIGNED"), ("", "name", "VARCHAR(150)"),
        ("", "description", "TEXT"), ("", "image", "VARCHAR(255)"),
        ("", "price", "DECIMAL(12,2)"), ("", "stock", "INT UNSIGNED"),
        ("FK", "category_id", "INT UNSIGNED"), ("FK", "brand_id", "INT UNSIGNED"),
        ("", "created_at / updated_at", "DATETIME")
    ]),
    "product_colors": (825, 285, 285, [
        ("PK/FK", "product_id", "INT UNSIGNED"), ("PK/FK", "color_id", "INT UNSIGNED")
    ]),
    "colors": (825, 75, 285, [
        ("PK", "id", "INT UNSIGNED"), ("UQ", "name", "VARCHAR(50)")
    ])
}

def height(fields):
    return 34 + len(fields) * 22

def draw_table(pdf, name, x, y, width, fields):
    h = height(fields)
    pdf.setFillColor(colors.white)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(1)
    pdf.roundRect(x, y, width, h, 7, fill=1, stroke=1)
    pdf.setFillColor(NAVY)
    pdf.roundRect(x, y + h - 34, width, 34, 7, fill=1, stroke=0)
    pdf.rect(x, y + h - 34, width, 17, fill=1, stroke=0)
    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 13)
    pdf.drawString(x + 12, y + h - 22, name)
    row_y = y + h - 51
    for marker, field, datatype in fields:
        pdf.setFillColor(ORANGE if marker else BLUE)
        pdf.setFont("Helvetica-Bold", 7.5)
        pdf.drawString(x + 10, row_y, marker)
        pdf.setFillColor(TEXT)
        pdf.setFont("Helvetica-Bold", 9)
        pdf.drawString(x + 46, row_y, field)
        pdf.setFillColor(colors.HexColor("#667985"))
        pdf.setFont("Helvetica", 8)
        pdf.drawRightString(x + width - 10, row_y, datatype)
        row_y -= 22

def relation(pdf, points, start_label="1", end_label="N"):
    pdf.setStrokeColor(BLUE)
    pdf.setLineWidth(1.5)
    path = pdf.beginPath()
    path.moveTo(*points[0])
    for point in points[1:]:
        path.lineTo(*point)
    pdf.drawPath(path)
    pdf.setFillColor(BLUE)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(points[0][0] + 5, points[0][1] + 5, start_label)
    pdf.drawString(points[-1][0] - 15, points[-1][1] + 5, end_label)
    x, y = points[-1]
    pdf.line(x, y, x - 8, y + 5)
    pdf.line(x, y, x - 8, y - 5)

pdf = canvas.Canvas(str(OUTPUT), pagesize=landscape(A3))
pdf.setTitle("ConstruMarket - Diagrama de entidad-relacion")
pdf.setFillColor(PALE)
pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
pdf.setFillColor(NAVY)
pdf.setFont("Helvetica-Bold", 25)
pdf.drawString(45, PAGE_H - 48, "ConstruMarket - Diagrama de entidad-relacion")
pdf.setFillColor(colors.HexColor("#5F7482"))
pdf.setFont("Helvetica", 11)
pdf.drawString(45, PAGE_H - 68, "Sprint 6 | MySQL + Sequelize | Modelo normalizado")

for name, (x, y, width, fields) in tables.items():
    draw_table(pdf, name, x, y, width, fields)

relation(pdf, [(285, 510), (325, 510), (325, 550), (360, 550)])
relation(pdf, [(285, 315), (335, 315), (335, 250), (385, 250)])
relation(pdf, [(285, 130), (340, 130), (340, 150), (385, 150)])
relation(pdf, [(715, 260), (770, 260), (770, 340), (825, 340)])
relation(pdf, [(967, 153), (967, 250), (785, 250), (785, 305), (825, 305)], "1", "N")

pdf.setFillColor(colors.white)
pdf.setStrokeColor(LINE)
pdf.roundRect(825, 485, 285, 105, 7, fill=1, stroke=1)
pdf.setFillColor(NAVY)
pdf.setFont("Helvetica-Bold", 11)
pdf.drawString(840, 565, "Referencias")
pdf.setFont("Helvetica", 9)
pdf.setFillColor(TEXT)
pdf.drawString(840, 545, "PK: clave primaria   FK: clave foranea")
pdf.drawString(840, 527, "UQ: valor unico   1 -> N: uno a muchos")
pdf.drawString(840, 509, "products <-> colors: muchos a muchos")
pdf.drawString(840, 491, "mediante la tabla product_colors")

pdf.setFillColor(colors.HexColor("#6E808B"))
pdf.setFont("Helvetica", 8)
pdf.drawRightString(PAGE_W - 45, 28, "ConstruMarket | Base de datos v1.0")
pdf.save()
print(OUTPUT)
