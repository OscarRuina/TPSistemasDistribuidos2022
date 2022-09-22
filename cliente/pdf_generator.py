from borb.pdf import Document
from borb.pdf.page.page import Page
from borb.pdf.canvas.layout.page_layout.multi_column_layout import SingleColumnLayout
from borb.pdf.canvas.layout.table.fixed_column_width_table import FixedColumnWidthTable as Table
from borb.pdf.canvas.layout.text.paragraph import Paragraph
from borb.pdf.canvas.layout.layout_element import Alignment
from decimal import Decimal


def buyer_seller_information(invoice_id, purchase_date, seller, buyer):
    table = Table(number_of_rows=6, number_of_columns=2)

    table.add(Paragraph("Factura: " + str(invoice_id), font="Helvetica-Bold"))
    table.add(Paragraph("Fecha: " + str(purchase_date),
              horizontal_alignment=Alignment.RIGHT))

    table.add(Paragraph(""))
    table.add(Paragraph(""))

    table.add(Paragraph("Vendedor"))
    table.add(Paragraph("Comprador"))

    table.add(Paragraph("Nombre y apellido: " +
              str(seller['name']) + " " + str(seller['lastname'])))
    table.add(Paragraph("Nombre y apellido: " +
              str(buyer['name']) + " " + str(buyer['lastname'])))

    table.add(Paragraph("Email: " + str(seller['email'])))
    table.add(Paragraph("Email: " + str(buyer['email'])))

    table.add(Paragraph("Usuario: " + str(seller['username'])))
    table.add(Paragraph("Usuario: " + str(buyer['username'])))

    table.set_padding_on_all_cells(
        Decimal(1), Decimal(1), Decimal(1), Decimal(1))
    table.no_borders()
    return table


def title():
    title_table = Table(number_of_rows=1, number_of_columns=1)
    title_table.add(Paragraph("Productos", font="Helvetica-Bold"))
    title_table.no_borders()
    return title_table


def products_information(products, total_amount):
    products_table = Table(number_of_rows=len(products)+3, number_of_columns=3)

    products_table.add(
        Paragraph("Nombre", horizontal_alignment=Alignment.CENTERED))
    products_table.add(
        Paragraph("Cantidad", horizontal_alignment=Alignment.CENTERED))
    products_table.add(Paragraph("Precio Unitario",
                       horizontal_alignment=Alignment.CENTERED))

    for product in products:
        products_table.add(
            Paragraph(product['name'], horizontal_alignment=Alignment.CENTERED))
        products_table.add(
            Paragraph(str(product['quantity']), horizontal_alignment=Alignment.CENTERED))
        products_table.add(
            Paragraph(str(product['price']), horizontal_alignment=Alignment.CENTERED))

    products_table.add(Paragraph(""))
    products_table.add(Paragraph(""))
    products_table.add(Paragraph(""))

    products_table.add(Paragraph(
        "Precio total", font="Helvetica-Bold", horizontal_alignment=Alignment.CENTERED))
    products_table.add(Paragraph(""))
    products_table.add(Paragraph(str(total_amount),
                       horizontal_alignment=Alignment.CENTERED))

    products_table.set_padding_on_all_cells(
        Decimal(1), Decimal(1), Decimal(1), Decimal(1))
    return products_table


def pdf_generator(invoice_id, purchase_date, seller, buyer, products, total_amount):
    pdf = Document()
    page = Page()
    pdf.insert_page(page)
    page_layout = SingleColumnLayout(page)
    page_layout.vertical_margin = page.get_page_info().get_height() * Decimal(0.01)
    page_layout.add(buyer_seller_information(
        invoice_id, purchase_date, seller, buyer))
    page_layout.add(Paragraph(" "))
    page_layout.add(title())
    page_layout.add(Paragraph(" "))
    page_layout.add(products_information(products, total_amount))

    return pdf
