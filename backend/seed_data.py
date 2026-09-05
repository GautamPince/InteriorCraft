import sys
import os

# Add backend directory to python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.all_models import (
    User, Service, Project, ProjectImage, BlogPost, Testimonial, Consultation, ContactMessage
)

def seed():
    print("[CasaCraft] Initializing Database Schema...")
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if users already exist
        if db.query(User).filter(User.email == "admin@casacraft.in").first():
            print("[CasaCraft] Database already seeded. Skipping initial seeding.")
            return

        print("[CasaCraft] Creating Admin & Editor users...")
        admin = User(
            email="admin@casacraft.in",
            hashed_password=get_password_hash("AdminPass2026!"),
            full_name="Ananya Sharma (Principal Architect)",
            role="ADMIN"
        )
        editor = User(
            email="editor@casacraft.in",
            hashed_password=get_password_hash("EditorPass2026!"),
            full_name="Rohan Mehta (Senior Designer)",
            role="EDITOR"
        )
        db.add_all([admin, editor])
        db.commit()

        print("[CasaCraft] Seeding Services (9 core offerings)...")
        services = [
            Service(
                name="Complete Home Interiors",
                slug="complete-home-interiors",
                short_description="Turnkey interior design execution for 2BHK, 3BHK & Luxury Villas.",
                description="End-to-end interior design and site execution tailored to your lifestyle. Includes space planning, custom woodwork, electrical, ceiling design, painting, lighting, and final styling.",
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                starting_price=650000.0,
                features={"items": ["Turnkey Execution", "3D Visualization", "Dedicated Project Manager", "10-Year Warranty", "45-Day Delivery Guarantee"]}
            ),
            Service(
                name="Modular Kitchen",
                slug="modular-kitchen",
                short_description="Ergonomic, modern Indian kitchen solutions with soft-close hardware.",
                description="Precision-engineered modular kitchens built with BWP marine ply, Hettich/Blum soft-close hardware, acrylic & laminate finishes, quartz counter tops, and smart storage units.",
                image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
                starting_price=220000.0,
                features={"items": ["BWP Marine Ply", "Hettich/Blum Hardware", "Quartz Countertops", "Anti-Scratch Acrylic", "Pantry Towers & Corner Pullouts"]}
            ),
            Service(
                name="Living Room",
                slug="living-room",
                short_description="Warm, architectural living room spaces designed for togetherness.",
                description="Custom TV unit design, accent walls, acoustic ceiling panels, bespoke seating layouts, and layered ambient lighting crafted for memorable family moments.",
                image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
                starting_price=180000.0,
                features={"items": ["Custom Louver Paneling", "Ambient LED Cove Lighting", "Ergonomic Sofa Layouts", "Custom TV Console", "Art Curation"]}
            ),
            Service(
                name="Master Bedroom",
                slug="master-bedroom",
                short_description="Serene, spa-like sanctuary with floor-to-ceiling wardrobes.",
                description="Designed for ultimate relaxation with plush upholstered headboards, walk-in closets, mood lighting, acoustic treatment, and floating vanity desks.",
                image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
                starting_price=195000.0,
                features={"items": ["Floor-to-Ceiling Wardrobes", "Upholstered Headboard Wall", "Integrated Dresser Studio", "Automated Drapes Integration"]}
            ),
            Service(
                name="Kids Room",
                slug="kids-room",
                short_description="Playful, safe, and adaptable bedrooms that evolve with your children.",
                description="Fun, ergonomic spaces featuring study zones, vibrant storage solutions, soft-corner safety details, and modular furniture that grows with your child.",
                image="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
                starting_price=140000.0,
                features={"items": ["Ergonomic Study Desks", "Modular Toy Drawers", "Soft Edge Safety Detailing", "Chalkboard/Magnet Walls"]}
            ),
            Service(
                name="Bathroom",
                slug="bathroom",
                short_description="Luxury sanctuary baths with concealed plumbing and Italian marble.",
                description="Modern bathroom remodels featuring vanity units, glass shower enclosures, Kohler/Jaquar sanitary fittings, niche lighting, and anti-skid tile palettes.",
                image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                starting_price=95000.0,
                features={"items": ["Glass Shower Cubicles", "Floating Wooden Vanities", "Concealed Rain Showers", "Niche Ambient Lighting"]}
            ),
            Service(
                name="Home Office",
                slug="home-office",
                short_description="Productive, noise-insulated work spaces with integrated cable management.",
                description="Ergonomic workstations designed for WFH comfort. Includes sound absorbing wall panels, dual-monitor desks, book archives, and flattering Zoom lighting.",
                image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
                starting_price=110000.0,
                features={"items": ["Concealed Cable Routing", "Acoustic Wall Panels", "Ergonomic Desk Heights", "Library & Display Storage"]}
            ),
            Service(
                name="Lighting & False Ceiling",
                slug="lighting-false-ceiling",
                short_description="Layered architectural lighting and sleek gypsum false ceiling designs.",
                description="Transform your space with magnetic track lights, COB spotlights, warm LED coves, decorative chandeliers, and seamless Saint-Gobain gypsum ceilings.",
                image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
                starting_price=75000.0,
                features={"items": ["Saint-Gobain Gypsum Board", "Magnetic Track Lighting", "Smart Dimming Controllers", "Warm COB Spotlights"]}
            ),
            Service(
                name="Furniture & Decor",
                slug="furniture-decor",
                short_description="Curated custom furniture, teakwood dining, rug layering, and art pieces.",
                description="Bespoke furniture crafting using solid teakwood, cane mesh, bouclé fabrics, plush area rugs, and handpicked artwork from Indian artisans.",
                image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
                starting_price=125000.0,
                features={"items": ["Solid Teakwood Framing", "Premium Fabric Upholstery", "Artisanal Cane Detailing", "Custom Rug Sizing"]}
            ),
        ]
        db.add_all(services)
        db.commit()

        print("[CasaCraft] Seeding Projects (10 realistic Indian design projects)...")
        projects_data = [
            {
                "title": "Modern Ahmedabad Apartment",
                "slug": "modern-ahmedabad-apartment",
                "description": "A 3BHK residence in Bodakdev, Ahmedabad featuring raw concrete textures, warm teakwood panelling, and expansive brass trim accents suited for Gujarat's sunny climate.",
                "location": "Bodakdev, Ahmedabad",
                "city": "Ahmedabad",
                "property_type": "Apartment",
                "design_style": "Modern",
                "budget_min": 1800000.0,
                "budget_max": 2400000.0,
                "area_sqft": 2100,
                "bedrooms": 3,
                "featured": True,
                "cover_image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                ]
            },
            {
                "title": "Luxury Villa in Bangalore",
                "slug": "luxury-villa-in-bangalore",
                "description": "A sprawling 4BHK architectural villa in Indiranagar featuring biophilic indoor courtyards, double-height living ceilings, and Italian statuario marble flooring.",
                "location": "Indiranagar, Bangalore",
                "city": "Bangalore",
                "property_type": "Villa",
                "design_style": "Luxury",
                "budget_min": 4500000.0,
                "budget_max": 6500000.0,
                "area_sqft": 4200,
                "bedrooms": 4,
                "featured": True,
                "cover_image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                ]
            },
            {
                "title": "Minimal Home in Mumbai",
                "slug": "minimal-home-in-mumbai",
                "description": "Smart, minimalist sea-facing 2BHK in Worli maximizing space with fluted glass partitions, concealed storage units, and soft neutral cream palettes.",
                "location": "Worli, Mumbai",
                "city": "Mumbai",
                "property_type": "Apartment",
                "design_style": "Minimal",
                "budget_min": 1400000.0,
                "budget_max": 1900000.0,
                "area_sqft": 1150,
                "bedrooms": 2,
                "featured": True,
                "cover_image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
                ]
            },
            {
                "title": "Contemporary Apartment in Delhi",
                "slug": "contemporary-apartment-in-delhi",
                "description": "A refined 3BHK home in Vasant Vihar blending contemporary bold artwork with plush velvet lounge furniture and bronze lighting fixtures.",
                "location": "Vasant Vihar, New Delhi",
                "city": "Delhi",
                "property_type": "Apartment",
                "design_style": "Contemporary",
                "budget_min": 2500000.0,
                "budget_max": 3200000.0,
                "area_sqft": 2400,
                "bedrooms": 3,
                "featured": True,
                "cover_image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
                ]
            },
            {
                "title": "Warm Family Home in Patna",
                "slug": "warm-family-home-in-patna",
                "description": "An inviting 3BHK independent home in Boring Road, Patna, featuring handcrafted wooden jali screens, spacious open dining, and warm ambient ceiling coves.",
                "location": "Boring Road, Patna",
                "city": "Patna",
                "property_type": "Independent House",
                "design_style": "Traditional",
                "budget_min": 1200000.0,
                "budget_max": 1600000.0,
                "area_sqft": 1850,
                "bedrooms": 3,
                "featured": True,
                "cover_image": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                ]
            },
            {
                "title": "Scandinavian Studio in Pune",
                "slug": "scandinavian-studio-in-pune",
                "description": "Airy Scandinavian 1BHK studio in Koregaon Park with light birchwood furniture, pastel upholstery, and potted botanical elements.",
                "location": "Koregaon Park, Pune",
                "city": "Pune",
                "property_type": "Studio",
                "design_style": "Scandinavian",
                "budget_min": 800000.0,
                "budget_max": 1100000.0,
                "area_sqft": 650,
                "bedrooms": 1,
                "featured": False,
                "cover_image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
                "gallery": []
            },
            {
                "title": "Traditional Penthouse in Jaipur",
                "slug": "traditional-penthouse-in-jaipur",
                "description": "A royal 4BHK penthouse inspired by Rajasthani heritage featuring arches, inlaid marble floors, and brass vintage lamps.",
                "location": "C-Scheme, Jaipur",
                "city": "Jaipur",
                "property_type": "Penthouse",
                "design_style": "Traditional",
                "budget_min": 3800000.0,
                "budget_max": 5000000.0,
                "area_sqft": 3600,
                "bedrooms": 4,
                "featured": False,
                "cover_image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "gallery": []
            },
            {
                "title": "Industrial Loft in Hyderabad",
                "slug": "industrial-loft-in-hyderabad",
                "description": "Exposed brick, black metal framework, and custom micro-cement finishes highlight this tech executive's residence in Gachibowli.",
                "location": "Gachibowli, Hyderabad",
                "city": "Hyderabad",
                "property_type": "Apartment",
                "design_style": "Industrial",
                "budget_min": 2100000.0,
                "budget_max": 2800000.0,
                "area_sqft": 1950,
                "bedrooms": 3,
                "featured": False,
                "cover_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
                "gallery": []
            },
            {
                "title": "Minimalist Retreat in Kochi",
                "slug": "minimalist-retreat-in-kochi",
                "description": "A tranquil tropical minimalist home surrounded by coconut palms, with terracotta tile accents and natural clay plaster walls.",
                "location": "Fort Kochi, Kochi",
                "city": "Kochi",
                "property_type": "Independent House",
                "design_style": "Minimal",
                "budget_min": 2200000.0,
                "budget_max": 2900000.0,
                "area_sqft": 2200,
                "bedrooms": 3,
                "featured": False,
                "cover_image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "gallery": []
            },
            {
                "title": "Architectural Residence in Surat",
                "slug": "architectural-residence-in-surat",
                "description": "Generous 4BHK family home in Vesu with smart home automation, custom stone feature walls, and cantilevered balcony lounges.",
                "location": "Vesu, Surat",
                "city": "Surat",
                "property_type": "Villa",
                "design_style": "Modern",
                "budget_min": 3500000.0,
                "budget_max": 4800000.0,
                "area_sqft": 3400,
                "bedrooms": 4,
                "featured": False,
                "cover_image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
                "gallery": []
            }
        ]

        for pdata in projects_data:
            gallery = pdata.pop("gallery")
            project = Project(**pdata)
            db.add(project)
            db.flush()
            for idx, gurl in enumerate(gallery):
                db.add(ProjectImage(
                    project_id=project.id,
                    image_url=gurl,
                    alt_text=f"{project.title} - View {idx+1}",
                    sort_order=idx
                ))
        db.commit()

        print("[CasaCraft] Seeding Blog Posts (10 articles)...")
        blog_posts = [
            BlogPost(
                title="10 Trending Modular Kitchen Designs for Modern Indian Homes",
                slug="10-trending-modular-kitchen-designs-indian-homes",
                category="Kitchen",
                excerpt="From handleless acrylic cabinets to smart pantry pullouts, explore the top kitchen trends defining Indian homes this year.",
                content="The modern Indian kitchen is evolving into a high-tech, ergonomic space designed for both heavy cooking and seamless hosting. In this guide, we dive into moisture-resistant marine ply, quartz countertops that resist turmeric stains, and integrated chimney ventilation systems.",
                cover_image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Vastu Shastra Tips for Master Bedroom Decor & Peace",
                slug="vastu-shastra-tips-master-bedroom",
                category="Vastu",
                excerpt="Harmonize your bedroom layout according to authentic Vastu guidelines for better sleep quality and positive energy flow.",
                content="Positioning your bed in the South-West zone promotes grounded stability and rest. Learn how mirror placement, soothing earth tones, and warm wood textures enhance wellness according to architectural Vastu.",
                cover_image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Maximizing Small Living Rooms with Light & Mirrors",
                slug="maximizing-small-living-rooms-light-mirrors",
                category="Small Homes",
                excerpt="Clever interior design tricks to make compact 2BHK apartments feel twice as open and airy.",
                content="Low-profile sofas, vertical fluted paneling, and strategic mirror walls can instantly create visual height and reflect light into darker corners of urban apartments.",
                cover_image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="How to Budget for a 3BHK Turnkey Interior in India",
                slug="budgeting-for-3bhk-turnkey-interior-india",
                category="Budget Interiors",
                excerpt="A transparent breakdown of costs across woodwork, electricals, false ceilings, and soft furnishings.",
                content="Planning your interior budget can feel overwhelming. We break down realistic cost expectations between basic, premium, and luxury tiers for 3BHK homes across major metros.",
                cover_image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Selecting the Perfect Earthy Color Palette for Warm Interiors",
                slug="earthy-color-palette-warm-interiors",
                category="Color Ideas",
                excerpt="Master the art of combining warm beige, charcoal, muted terracotta, and brass details.",
                content="Neutral color palettes do not have to be boring. Discover how layering subtle shade variations, tactile linen, and champagne gold creates understated elegance.",
                cover_image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Architectural Lighting 101: Ambient, Task, and Accent",
                slug="architectural-lighting-101-ambient-task-accent",
                category="Lighting",
                excerpt="Why lighting is 50% of your interior's luxury feel and how to layer magnetic track lights.",
                content="Lighting transforms a room from flat to dynamic. We explain how combining warm 3000K LED coves with focused COB spotlights creates depth and mood.",
                cover_image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Solid Teak vs Engineed Wood: What Belongs in Your Home?",
                slug="teak-vs-engineered-wood-interiors",
                category="Furniture",
                excerpt="Comparing durability, moisture resistance, maintenance, and aesthetics for Indian climate conditions.",
                content="Wood selection impacts longevity. Understand where solid teak wood shines (dining tables, main doors) versus high-density moisture-resistant (HDMR) boards for wardrobes.",
                cover_image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Luxury Bathroom Remodeling: Spa-Like Fittings & Tile Trends",
                slug="luxury-bathroom-remodeling-spa-fittings",
                category="Furniture",
                excerpt="Transform your daily shower into a wellness sanctuary with concealed rain showers and floating vanities.",
                content="Explore large format porcelain slabs, anti-fingerprint black sanitaryware, and illuminated wall niches for modern bathroom design.",
                cover_image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Creating a Multi-Functional Kids Bedroom for Growth",
                slug="multi-functional-kids-bedroom-growth",
                category="Bedroom",
                excerpt="Smart bunk beds, integrated study nooks, and adaptable storage solutions for growing children.",
                content="Children grow quickly, and their rooms need to adapt. Learn how modular furniture systems allow easy conversion from play area to high school study zone.",
                cover_image="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
            ),
            BlogPost(
                title="Living Room Accent Walls: Louvers, Stone Slabs & Fluted Panels",
                slug="living-room-accent-walls-louvers-stone-slabs",
                category="Living Room",
                excerpt="Elevate your main hall wall into a stunning focal point with texture and backlighting.",
                content="TV background walls define living rooms. Compare PVC louvers, veneer paneling, and backlit onyx slabs for spectacular visual impact.",
                cover_image="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
            )
        ]
        db.add_all(blog_posts)
        db.commit()

        print("[CasaCraft] Seeding Testimonials (6 reviews)...")
        testimonials = [
            Testimonial(
                client_name="Vikram & Neha Shah",
                city="Ahmedabad",
                project_title="Modern Ahmedabad Apartment",
                quote="CasaCraft transformed our 3BHK in Bodakdev into an architectural marvel. The team delivered right on the 45-day promise with zero compromises on wood quality.",
                rating=5,
                avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            ),
            Testimonial(
                client_name="Dr. Rajesh Kulkarni",
                city="Bangalore",
                project_title="Luxury Villa in Bangalore",
                quote="The double-height living room layout and biophilic indoor courtyard designed by CasaCraft exceed anything we imagined. Truly world-class craftsmanship.",
                rating=5,
                avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            ),
            Testimonial(
                client_name="Pooja Sharma",
                city="Mumbai",
                project_title="Minimal Home in Mumbai",
                quote="Designing a sea-facing apartment in Worli comes with space constraints. CasaCraft's smart storage solutions made our 2BHK feel double its size!",
                rating=5,
                avatar_url="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
            ),
            Testimonial(
                client_name="Amitabh & Shalini Roy",
                city="Delhi",
                project_title="Contemporary Apartment in Delhi",
                quote="Flawless project management from initial 3D render to site handover. The custom lighting and modular kitchen are absolute showstoppers.",
                rating=5,
                avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            ),
            Testimonial(
                client_name="Sanjay Verma",
                city="Patna",
                project_title="Warm Family Home in Patna",
                quote="They respected our traditional preferences while infusing modern elegance. Transparent pricing and no hidden costs throughout the project.",
                rating=5,
                avatar_url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            ),
            Testimonial(
                client_name="Meera Nair",
                city="Kochi",
                project_title="Minimalist Retreat in Kochi",
                quote="CasaCraft's attention to natural materials and acoustic lighting created a calm sanctuary for our family. Exceptional team to work with!",
                rating=5,
                avatar_url="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
            )
        ]
        db.add_all(testimonials)
        db.commit()

        print("[CasaCraft] Database Seeding Complete!")

    except Exception as e:
        db.rollback()
        print(f"[CasaCraft] Error seeding database: {e}")
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    seed()
