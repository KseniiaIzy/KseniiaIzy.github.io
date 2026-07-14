from __future__ import annotations

import os
import shutil
from html import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUTPUT_DIR = os.path.join(ROOT, "output", "pdf")
OUTPUT_PDF = os.path.join(OUTPUT_DIR, "Ksenia-Isidorova-CV.pdf")
PUBLIC_PDF = os.path.join(ROOT, "public", "Ksenia-Isidorova-CV.pdf")
PORTRAIT = os.path.join(ROOT, "public", "ksenia-isidorova.jpg")

PAGE_W, PAGE_H = A4
LEFT = 48
RIGHT = 48
CONTENT_W = PAGE_W - LEFT - RIGHT

SLATE = HexColor("#303744")
INK = HexColor("#1D232B")
MUTED = HexColor("#66707C")
LIGHT = HexColor("#E6E9ED")
PALE = HexColor("#F3F5F7")
TEAL = HexColor("#2F7183")
WHITE = HexColor("#FFFFFF")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Segoe", r"C:\Windows\Fonts\segoeui.ttf"))
    pdfmetrics.registerFont(TTFont("Segoe-Semibold", r"C:\Windows\Fonts\seguisb.ttf"))
    pdfmetrics.registerFont(TTFont("Segoe-Light", r"C:\Windows\Fonts\segoeuil.ttf"))


BODY = ParagraphStyle(
    "Body",
    fontName="Segoe",
    fontSize=8.65,
    leading=11.15,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=0,
)
BODY_SMALL = ParagraphStyle(
    "BodySmall",
    parent=BODY,
    fontSize=8.1,
    leading=10.1,
)
BODY_MUTED = ParagraphStyle(
    "BodyMuted",
    parent=BODY,
    fontSize=8.1,
    leading=10.0,
    textColor=MUTED,
)
BULLET = ParagraphStyle(
    "Bullet",
    parent=BODY,
    leftIndent=9,
    firstLineIndent=-9,
    spaceAfter=2.0,
)
BULLET_TIGHT = ParagraphStyle(
    "BulletTight",
    parent=BULLET,
    fontSize=8.15,
    leading=10.05,
    spaceAfter=1.6,
)
ROLE = ParagraphStyle(
    "Role",
    fontName="Segoe-Semibold",
    fontSize=10.1,
    leading=12.0,
    textColor=SLATE,
)
COMPANY = ParagraphStyle(
    "Company",
    fontName="Segoe-Semibold",
    fontSize=8.45,
    leading=10.0,
    textColor=INK,
)
META = ParagraphStyle(
    "Meta",
    fontName="Segoe",
    fontSize=7.9,
    leading=9.6,
    textColor=MUTED,
)
CARD_TITLE = ParagraphStyle(
    "CardTitle",
    fontName="Segoe-Semibold",
    fontSize=8.3,
    leading=10.0,
    textColor=TEAL,
)
CARD_TEXT = ParagraphStyle(
    "CardText",
    fontName="Segoe",
    fontSize=7.7,
    leading=9.4,
    textColor=INK,
)


def para(c: canvas.Canvas, text: str, x: float, y: float, width: float, style=BODY) -> float:
    p = Paragraph(text, style)
    _, h = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y - h)
    return y - h


def plain(text: str) -> str:
    return escape(text).replace("\n", "<br/>")


def section(c: canvas.Canvas, title: str, y: float) -> float:
    y -= 9
    c.setFont("Segoe-Semibold", 10.6)
    c.setFillColor(SLATE)
    c.drawString(LEFT, y, title.upper())
    y -= 4.5
    c.setStrokeColor(TEAL)
    c.setLineWidth(0.9)
    c.line(LEFT, y, PAGE_W - RIGHT, y)
    return y - 9


def bullets(c: canvas.Canvas, items: list[str], y: float, style=BULLET, width: float = CONTENT_W) -> float:
    for item in items:
        y = para(c, "- " + plain(item), LEFT, y, width, style)
    return y


def role_block(
    c: canvas.Canvas,
    y: float,
    role: str,
    company: str,
    meta: str,
    items: list[str],
    tight: bool = False,
) -> float:
    y = para(c, plain(role), LEFT, y, CONTENT_W, ROLE)
    y = para(c, plain(company), LEFT, y + 0.5, CONTENT_W, COMPANY)
    y = para(c, f"<i>{plain(meta)}</i>", LEFT, y, CONTENT_W, META) - 3.5
    y = bullets(c, items, y, BULLET_TIGHT if tight else BULLET)
    return y - 4


def draw_header(c: canvas.Canvas) -> None:
    header_h = 112
    c.setFillColor(SLATE)
    c.rect(0, PAGE_H - header_h, PAGE_W, header_h, fill=1, stroke=0)
    photo = 92
    c.drawImage(
        ImageReader(PORTRAIT),
        0,
        PAGE_H - header_h,
        width=photo,
        height=header_h,
        preserveAspectRatio=False,
        mask="auto",
    )

    x = 118
    c.setFillColor(WHITE)
    c.setFont("Segoe-Light", 25)
    c.drawString(x, PAGE_H - 42, "Ksenia Isidorova")
    c.setFont("Segoe-Semibold", 11.2)
    c.setFillColor(HexColor("#DDE6EA"))
    c.drawString(x, PAGE_H - 62, "Generative AI Engineer")
    c.setFont("Segoe", 8.6)
    c.setFillColor(HexColor("#BAC2CA"))
    c.drawString(x, PAGE_H - 80, "Custom diffusion models | Cultural AI | Creative AI pipelines | AI automation")

    c.setFont("Segoe", 8.0)
    c.drawString(x, PAGE_H - 98, "Odesa, Ukraine / Lisbon, Portugal")
    c.drawString(289, PAGE_H - 98, "kseniia.is.upark@gmail.com")
    c.drawRightString(PAGE_W - 32, PAGE_H - 98, "+380 98 544 73 63")

    c.linkURL("mailto:kseniia.is.upark@gmail.com", (289, PAGE_H - 101, 415, PAGE_H - 89), relative=0)


def draw_footer(c: canvas.Canvas, page: int) -> None:
    c.setStrokeColor(LIGHT)
    c.setLineWidth(0.6)
    c.line(LEFT, 29, PAGE_W - RIGHT, 29)
    c.setFont("Segoe", 7.2)
    c.setFillColor(MUTED)
    c.drawString(LEFT, 17, "linkedin.com/in/ksenia-isidorova")
    c.linkURL(
        "https://www.linkedin.com/in/ksenia-isidorova",
        (LEFT, 13, 185, 26),
        relative=0,
    )
    c.drawRightString(PAGE_W - RIGHT, 17, f"Ksenia Isidorova - Page {page} of 2")


def expertise_table(c: canvas.Canvas, y: float) -> float:
    cards = [
        (
            "MODEL TRAINING",
            "Stable Diffusion, SDXL, FLUX, LoRA, embeddings, ControlNet, dataset curation, visual QA, loss analysis",
        ),
        (
            "AI ENGINEERING",
            "Python, JavaScript, OpenAI API, Gemini API, n8n, agents, Docker, RunPod, Modal, Hugging Face",
        ),
        (
            "CREATIVE AI TOOLING",
            "ComfyUI, Automatic1111, Forge WebUI, OneTrainer, Ostris AI Toolkit, Kohya_SS, Photoshop",
        ),
        (
            "PRODUCTION SYSTEMS",
            "Unity, C#, INK, shaders, Spine, asset optimization, Git, Jira, Notion, technical documentation",
        ),
    ]
    cell_w = (CONTENT_W - 8) / 2
    data = []
    for i in range(0, len(cards), 2):
        row = []
        for title, card_text in cards[i : i + 2]:
            content = (
                f'<font name="Segoe-Semibold" color="#2F7183">{plain(title)}</font><br/>'
                f'{plain(card_text)}'
            )
            row.append(Paragraph(content, CARD_TEXT))
        data.append(row)
    table = Table(data, colWidths=[cell_w, cell_w], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.4, LIGHT),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, WHITE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    _, h = table.wrap(CONTENT_W, PAGE_H)
    table.drawOn(c, LEFT, y - h)
    return y - h


def project(c: canvas.Canvas, y: float, title: str, subtitle: str, body: str, tech: str) -> float:
    y = para(c, plain(title), LEFT, y, CONTENT_W, ROLE)
    y = para(c, f"<i>{plain(subtitle)}</i>", LEFT, y + 0.5, CONTENT_W, META)
    y = para(c, plain(body), LEFT, y - 1.5, CONTENT_W, BODY_SMALL)
    y = para(c, f"<b>Technologies:</b> {plain(tech)}", LEFT, y - 1.0, CONTENT_W, BODY_SMALL)
    return y - 5


def draw_page_one(c: canvas.Canvas) -> None:
    draw_header(c)
    y = PAGE_H - 129

    y = section(c, "Professional summary", y)
    summary = (
        "Generative AI Engineer with production experience in custom diffusion models, creative AI pipelines, "
        "culturally-aware systems, and AI automation. Takes AI solutions from research and dataset design through "
        "training, evaluation, deployment, documentation, and team support. Combines applied AI, Python/JavaScript "
        "automation, creative technology, and a strong commercial production background in mobile games."
    )
    y = para(c, plain(summary), LEFT, y, CONTENT_W, BODY) - 2

    y = section(c, "Selected AI impact", y)
    y = bullets(
        c,
        [
            "Trained and deployed custom SD/FLUX-based models for production art teams, reducing art production time by up to 70%.",
            "Built culturally-aware generative workflows for SWANA representation, focused on local visual accuracy and bias reduction.",
            "Created n8n automation workflows, including multi-agent systems, Slack-integrated assistants, and department-specific ChatGPT/Gemini tools.",
            "Set up working environments for AI and Art Production teams, including deployment, workflow configuration, documentation, onboarding, and support.",
        ],
        y,
        BULLET_TIGHT,
    )

    y = section(c, "Core expertise", y + 2)
    y = expertise_table(c, y) - 1

    y = section(c, "Professional experience", y)
    y = role_block(
        c,
        y,
        "Art AI Researcher / Generative AI Engineer",
        "Glera Games / Vizor Apps",
        "May 2024 - Present | Projects: Road Trip, Pines Peak",
        [
            "Train custom SD/FLUX-based diffusion models for commercial art teams, from data strategy and dataset curation to testing and production delivery.",
            "Run training with OneTrainer, Ostris AI Toolkit, Kohya_SS, and PyTorch/TensorFlow-based workflows; evaluate loss graphs, overfitting, prompt responsiveness, style adherence, and artist usability.",
            "Build production workflows in ComfyUI, Automatic1111, and Forge WebUI, supported by clear documentation and onboarding materials.",
            "Develop n8n automations, multi-agent workflows, a Slack SQL assistant for Analytics, and custom ChatGPT/Gemini assistants for internal teams.",
            "Deploy models and workflows, configure access, support users, and iterate on solutions after delivery.",
        ],
        tight=True,
    )

    y = role_block(
        c,
        y,
        "Generative AI Consultant / Cultural AI Researcher",
        "ARK Knowledge Networks | Qareeb | American University of Beirut project | Private consulting",
        "2024 - Present | Project-based cultural AI and localized model development",
        [
            "Contribute to SWANA-focused initiatives that improve local representation and reduce bias in generated content.",
            "Support dataset preparation, model evaluation, workflow design, culturally-specific testing, and human-in-the-loop review for localized visual systems.",
        ],
        tight=True,
    )
    draw_footer(c, 1)


def draw_page_two(c: canvas.Canvas) -> None:
    y = PAGE_H - 43
    y = section(c, "Earlier experience", y)

    y = role_block(
        c,
        y,
        "Technical Artist / Creative AI and Unity Tools Developer",
        "Kwalee Ltd., Lisbon",
        "June 2023 - February 2024 | Unity interactive story with INK integration",
        [
            "Worked as the main Technical Artist, bridging art, writing, design, production, and engineering.",
            "Built chapter workflows, INK logic, UI and FTUE flows, camera animation, particles, and Spine integration.",
            "Developed C# and Python tools, including a Chapter Thumbnail Creator and PNG-level Character Exporter.",
            "Created custom INK commands and improved storyboard and cross-department workflows; used playtest metrics to plan updates.",
            "Participated in Stable Diffusion model training and AI integration planning, establishing the foundation for later Generative AI specialization.",
        ],
        tight=True,
    )

    y = role_block(
        c,
        y,
        "Technical Artist / Pipeline and Automation Specialist",
        "Playrix / VOKI Games, Kyiv",
        "February 2021 - June 2023 | Free-to-play mobile games",
        [
            "Contributed to two top free-to-play projects, including one title with 43.8M+ downloads.",
            "Built Python scripts and improved art, animation, texture, and asset-integration workflows for mobile performance.",
            "Raised the Tech Art department's technical proficiency by 30% within 4 months through mentoring, internal training, and educational materials.",
            "Led technical animation initiatives, supervised asset optimization, and led a new feature implementation as Lead Technical Artist.",
        ],
        tight=True,
    )

    y = role_block(
        c,
        y,
        "Freelance Head of Art / Indie Game Developer",
        "Independent projects",
        "January 2020 - April 2022",
        [
            "Led end-to-end visual production for tower defense/RTS, platformer, and runner projects, combining art direction, asset creation, Unity implementation, and production problem-solving.",
        ],
        tight=True,
    )

    y = section(c, "Selected AI projects", y + 1)
    y = project(
        c,
        y,
        "Custom Diffusion Models for Art Production",
        "Road Trip / Pines Peak - Glera Games / Vizor Apps",
        "Built and deployed custom models for art teams, covering dataset design, training, evaluation, workflow setup, documentation, and artist onboarding. Reduced art production time by up to 70%.",
        "Stable Diffusion, FLUX, LoRA, ComfyUI, Forge, OneTrainer, Ostris AI Toolkit, Kohya_SS, RunPod, Docker",
    )
    y = project(
        c,
        y,
        "SWANA Cultural AI Models",
        "ARK Knowledge Networks / Qareeb / American University of Beirut project",
        "Contributed to culturally-aware model initiatives focused on accurate regional representation, localized behavior, and practical human review.",
        "Custom diffusion models, dataset curation, prompt evaluation, visual QA, human-in-the-loop review",
    )
    y = project(
        c,
        y,
        "Internal AI Automation Assistants",
        "Slack-integrated and department-specific tools",
        "Designed n8n-based assistants for internal teams, including a Slack SQL assistant for Analytics and custom ChatGPT/Gemini tools for research, documentation, analysis, and operations.",
        "n8n, Slack, OpenAI API, Gemini API, JavaScript, agents, workflow automation",
    )

    y = section(c, "Education, courses and languages", y + 1)
    rows = [
        [Paragraph("<b>Education</b>", BODY_SMALL), Paragraph("Bachelor of Fine Arts, Southern Ukrainian National Pedagogical University, Odesa | 2018 - 2022", BODY_SMALL)],
        [Paragraph("<b>Courses</b>", BODY_SMALL), Paragraph("Automation with Python - Google / Coursera; Creating a 2D Platformer with Unity - Udemy; Motion Design, Illustration, Brand Identity - SKVOT", BODY_SMALL)],
        [Paragraph("<b>Languages</b>", BODY_SMALL), Paragraph("Ukrainian - native; Russian - native; English - B2; Portuguese - basic; German - basic", BODY_SMALL)],
    ]
    table = Table(rows, colWidths=[72, CONTENT_W - 72], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.35, LIGHT),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
            ]
        )
    )
    _, h = table.wrap(CONTENT_W, PAGE_H)
    table.drawOn(c, LEFT, y - h)
    draw_footer(c, 2)


def build() -> None:
    register_fonts()
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PDF, pagesize=A4, pageCompression=1)
    c.setTitle("Ksenia Isidorova - Generative AI Engineer")
    c.setAuthor("Ksenia Isidorova")
    c.setSubject("Curriculum Vitae")
    draw_page_one(c)
    c.showPage()
    draw_page_two(c)
    c.showPage()
    c.save()
    shutil.copy2(OUTPUT_PDF, PUBLIC_PDF)
    print(OUTPUT_PDF)
    print(PUBLIC_PDF)


if __name__ == "__main__":
    build()
