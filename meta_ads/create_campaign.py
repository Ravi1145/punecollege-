"""
Meta Marketing API – NRI Real Estate Lead Gen Campaign
Pune New Construction Projects

Install dependencies:
    pip install facebook-business python-dotenv

Run:
    python create_campaign.py
"""

import os
import json
from dotenv import load_dotenv
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.leadgenform import LeadgenForm

# ── Load credentials from .env ────────────────────────────────────────────────
load_dotenv()

APP_ID       = os.getenv("META_APP_ID")
APP_SECRET   = os.getenv("META_APP_SECRET")
ACCESS_TOKEN = os.getenv("META_ACCESS_TOKEN")
AD_ACCOUNT   = os.getenv("META_AD_ACCOUNT_ID")   # already prefixed with act_
PAGE_ID      = os.getenv("META_PAGE_ID")

FacebookAdsApi.init(APP_ID, APP_SECRET, ACCESS_TOKEN)
account = AdAccount(AD_ACCOUNT)

# ── 1. CAMPAIGN ───────────────────────────────────────────────────────────────
def create_campaign() -> str:
    campaign = account.create_campaign(fields=[], params={
        "name":      "Pune New Construction – NRI Lead Gen 2025",
        "objective": Campaign.Objective.lead_generation,
        "status":    Campaign.Status.paused,   # change to ACTIVE when ready
        "special_ad_categories": [],
    })
    campaign_id = campaign["id"]
    print(f"✅ Campaign created: {campaign_id}")
    return campaign_id


# ── 2. LEAD GEN FORM ──────────────────────────────────────────────────────────
def create_lead_form() -> str:
    """Creates the instant lead form on the Facebook Page."""
    params = {
        "name":        "NRI Pune Property Enquiry Form",
        "page_id":     PAGE_ID,
        "locale":      "en_US",
        "headline":    "Get Exclusive NRI Property Details",
        "description": "Our NRI specialists will reach out within 24 hours.",
        "privacy_policy": {
            "url":   "https://yourwebsite.com/privacy",
            "label": "Privacy Policy",
        },
        "questions": [
            {"type": "FULL_NAME"},
            {"type": "EMAIL"},
            {"type": "PHONE"},
            {
                "type":    "CUSTOM",
                "label":   "Country of Residence",
                "key":     "country_of_residence",
                "options": [
                    {"value": "USA",       "key": "usa"},
                    {"value": "UAE",       "key": "uae"},
                    {"value": "UK",        "key": "uk"},
                    {"value": "Canada",    "key": "canada"},
                    {"value": "Australia", "key": "australia"},
                    {"value": "Singapore", "key": "singapore"},
                    {"value": "Other",     "key": "other"},
                ],
            },
            {
                "type":    "CUSTOM",
                "label":   "Budget Range",
                "key":     "budget_range",
                "options": [
                    {"value": "₹50L – ₹75L",     "key": "50l_75l"},
                    {"value": "₹75L – ₹1.5Cr",   "key": "75l_1cr5"},
                    {"value": "₹1.5Cr – ₹3Cr",   "key": "1cr5_3cr"},
                    {"value": "₹3Cr+",            "key": "3cr_plus"},
                ],
            },
            {
                "type":    "CUSTOM",
                "label":   "Preferred Location in Pune",
                "key":     "preferred_location",
                "options": [
                    {"value": "Baner",       "key": "baner"},
                    {"value": "Wakad",       "key": "wakad"},
                    {"value": "Hinjewadi",   "key": "hinjewadi"},
                    {"value": "Kothrud",     "key": "kothrud"},
                    {"value": "Viman Nagar", "key": "viman_nagar"},
                    {"value": "Any",         "key": "any"},
                ],
            },
            {
                "type":    "CUSTOM",
                "label":   "When are you looking to invest?",
                "key":     "investment_timeline",
                "options": [
                    {"value": "Immediately",    "key": "immediately"},
                    {"value": "Within 6 months","key": "6_months"},
                    {"value": "Within 1 year",  "key": "1_year"},
                    {"value": "Just exploring", "key": "exploring"},
                ],
            },
        ],
        "thank_you_page": {
            "title":   "Thank You!",
            "body":    "Our NRI specialist will contact you on WhatsApp/Email within 24 hours.",
            "cta_type": "VIEW_WEBSITE",
            "cta_link": "https://yourwebsite.com",
        },
    }

    from facebook_business.adobjects.page import Page
    page = Page(PAGE_ID)
    form = page.create_leadgen_form(params=params)
    form_id = form["id"]
    print(f"✅ Lead form created: {form_id}")
    return form_id


# ── 3. AD SET ─────────────────────────────────────────────────────────────────
def create_ad_set(campaign_id: str, form_id: str) -> str:
    """
    Targeting: NRIs (Indians living abroad) interested in real estate.
    Countries: US, UAE, UK, Canada, Australia, Singapore.
    """
    targeting = {
        "age_min": 28,
        "age_max": 60,
        "geo_locations": {
            "countries": ["US", "AE", "GB", "CA", "AU", "SG"],
        },
        "flexible_spec": [
            {
                "interests": [
                    {"id": "6003349442621", "name": "Real estate"},
                    {"id": "6003397425735", "name": "Real estate investing"},
                    {"id": "6003232518610", "name": "Property investment"},
                    {"id": "6003349530421", "name": "Luxury real estate"},
                ],
                "behaviors": [
                    {"id": "6015559470583", "name": "Expats (India)"},
                ],
            }
        ],
        "publisher_platforms": ["facebook", "instagram"],
        "facebook_positions":  ["feed", "right_hand_column"],
        "instagram_positions": ["stream", "reels"],
    }

    ad_set = account.create_ad_set(fields=[], params={
        "name":                  "NRI – Pune Property Leads",
        "campaign_id":           campaign_id,
        "billing_event":         AdSet.BillingEvent.impressions,
        "optimization_goal":     AdSet.OptimizationGoal.lead_generation,
        "bid_strategy":          AdSet.BidStrategy.lowest_cost_without_cap,
        "daily_budget":          50000,   # in paise → ₹500/day; adjust as needed
        "targeting":             targeting,
        "leadgen_form_id":       form_id,
        "start_time":            "2025-05-01T00:00:00+05:30",
        "end_time":              "2025-06-30T23:59:59+05:30",
        "status":                AdSet.Status.paused,
    })
    ad_set_id = ad_set["id"]
    print(f"✅ Ad Set created: {ad_set_id}")
    return ad_set_id


# ── 4. AD CREATIVE ────────────────────────────────────────────────────────────
def create_creative(form_id: str, ad_variant: dict) -> str:
    """
    Creates an ad creative for a single image lead gen ad.
    Replace image_hash with your uploaded image hash from the Media Library.
    """
    creative = account.create_ad_creative(fields=[], params={
        "name": ad_variant["name"],
        "object_story_spec": {
            "page_id": PAGE_ID,
            "link_data": {
                "image_hash":   ad_variant.get("image_hash", "YOUR_IMAGE_HASH_HERE"),
                "link":         f"https://www.facebook.com/lead_gen/form/{form_id}",
                "name":         ad_variant["headline"],
                "description":  ad_variant["description"],
                "message":      ad_variant["primary_text"],
                "call_to_action": {
                    "type":  "LEARN_MORE",
                    "value": {"lead_gen_form_id": form_id},
                },
            },
        },
    })
    creative_id = creative["id"]
    print(f"✅ Creative created: {creative_id}")
    return creative_id


# ── 5. AD ─────────────────────────────────────────────────────────────────────
def create_ad(ad_set_id: str, creative_id: str, name: str) -> str:
    ad = account.create_ad(fields=[], params={
        "name":        name,
        "adset_id":    ad_set_id,
        "creative":    {"creative_id": creative_id},
        "status":      Ad.Status.paused,
    })
    ad_id = ad["id"]
    print(f"✅ Ad created: {ad_id}")
    return ad_id


# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    print("\n🚀 Creating NRI Real Estate Lead Gen Campaign on Meta...\n")

    # Load ad copy
    with open("ad_copy.json") as f:
        copy = json.load(f)

    # Step 1 – Campaign
    campaign_id = create_campaign()

    # Step 2 – Lead form
    form_id = create_lead_form()

    # Step 3 – Ad set
    ad_set_id = create_ad_set(campaign_id, form_id)

    # Step 4 & 5 – Creatives + Ads (one per ad variant)
    ad_variants = [
        {
            "name":        "NRI Investment – Pune Premium Homes",
            "headline":    "Your Dream Home in Pune Awaits – Invest from Anywhere",
            "primary_text": copy["ads"][0]["primary_text"],
            "description": "RERA-certified | NRI-friendly | Starting ₹65 Lakhs",
            "image_hash":  "YOUR_IMAGE_HASH_1",   # upload image via Meta Ads Manager
        },
        {
            "name":        "NRI ROI – Pune Real Estate",
            "headline":    "Pune Real Estate: The Smartest NRI Investment of 2025",
            "primary_text": copy["ads"][1]["primary_text"],
            "description": "Trusted by 500+ NRI investors | RERA Certified",
            "image_hash":  "YOUR_IMAGE_HASH_2",
        },
        {
            "name":        "NRI Urgency – Limited Units",
            "headline":    "Only 12 Units Left – Pune's Fastest-Selling NRI Project",
            "primary_text": copy["ads"][2]["primary_text"],
            "description": "Pre-launch price ends soon | Act now",
            "image_hash":  "YOUR_IMAGE_HASH_3",
        },
    ]

    created_ids = []
    for variant in ad_variants:
        creative_id = create_creative(form_id, variant)
        ad_id       = create_ad(ad_set_id, creative_id, variant["name"])
        created_ids.append({"ad": variant["name"], "ad_id": ad_id, "creative_id": creative_id})

    print("\n✅ Campaign setup complete!\n")
    print(f"   Campaign ID : {campaign_id}")
    print(f"   Form ID     : {form_id}")
    print(f"   Ad Set ID   : {ad_set_id}")
    print("\n   Ads created:")
    for item in created_ids:
        print(f"   • {item['ad']} → Ad ID: {item['ad_id']}")

    print("\n⚠️  All items created in PAUSED status.")
    print("   1. Upload your property images in Meta Ads Manager and replace image hashes.")
    print("   2. Review all copy, targeting & budget.")
    print("   3. Set status to ACTIVE when ready.\n")


if __name__ == "__main__":
    main()
