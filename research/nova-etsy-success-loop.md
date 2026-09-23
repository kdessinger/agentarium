# Nova Research Loop — Etsy Success Notes

Source video already processed:

`https://www.tiktok.com/t/ZP8GDRmMF/`

Resolved video:

`https://www.tiktok.com/@androoagi/video/7636984528522824991`

Existing transcript files:

- `research/tiktok/7636984528522824991.vtt`
- `research/tiktok/7636984528522824991.raw.txt`
- `research/tiktok/7636984528522824991.md`

## Why Nova matters

Nova is not just a generic “research agent.” In AndrooAGI’s system, Nova appears to be the success engine behind the Etsy stores.

The transcript explicitly says the secret is **not** merely that agents produce products. The secret is that Nova researches what is already working on Etsy, extracts proven concepts, and passes those concepts to Forge for production.

## Transcript evidence

Relevant passage from the ASR transcript:

> we have the research lab over here which I'll quickly go over Nova
>
> lives inside of the research lab manages it
>
> throughout the day he'll go look at other Etsy stores that are performing well
>
> and this is a huge secret to how to really make money and have your agents really make money with an Etsy store
>
> is not because they're producing products
>
> but because Nova in the research lab is doing research on other Etsy stores that are doing extremely extremely well
>
> and he just copies and paste their concepts and gives it to forge
>
> so he'll just hey let's see what Etsy products are doing really well what people are buying on Etsy
>
> and then he's like shit they're buying this this this and this
>
> and then he takes that information and then he just gives it over to forge
>
> and forge starts pumping out designs based on the research he did
>
> and Nova will do research on all the other businesses that were running as well as he'll give me updates on the AI news like if there's a new model that dropped or anything like that so I don't have to go scroll on Twitter myself

## Nova's Etsy job

Nova performs continuous market intelligence:

1. Watches Etsy stores that are performing well.
2. Watches Etsy products that are selling well.
3. Identifies concepts customers are already buying.
4. Extracts reusable patterns/inspiration.
5. Sends those concepts to Forge.
6. Forge turns those concepts into new designs/products/listings.

## Key insight

The Etsy lab’s success loop is:

```text
Market evidence
  → Nova extracts proven concepts
  → Forge generates product/design variants
  → Printify/Etsy turns variants into sellable products
  → sales/order data becomes new evidence
  → Nova repeats the loop
```

This is different from blind generation. The system is not “make random AI slop until something sells.” It is closer to:

```text
observe market → pattern match → adapt → publish → measure → repeat
```

## What Nova should output in Agentarium

Nova should produce structured **opportunity packets** rather than vague research summaries.

Suggested packet fields:

```yaml
opportunity_id: string
source_platform: Etsy
source_store_or_listing: string
observed_signal:
  - high sales/ranking
  - many reviews
  - strong favorites
  - visible demand trend
  - repeated motif/theme
customer_buyer_pattern: string
product_concept: string
visual_style_notes: string
keywords: [string]
pricing_observation: string
competition_notes: string
adaptation_angle: string
risk_flags:
  - IP/copyright risk
  - trademark risk
  - oversaturated niche
  - policy risk
handoff_target: Forge
recommended_next_action: string
confidence: low|medium|high
```

## Required Agentarium features for Nova

- Research queue
- Source/watchlist list
- Competitor/store cards
- Evidence screenshots/links
- Opportunity packet builder
- Handoff lane to Forge
- Research freshness timestamp
- Confidence score
- Risk/IP/trademark notes
- Feedback from Forge on whether research produced useful products

## Product implication

Nova should sit upstream of every production lab, not only Etsy. The same pattern applies to:

- Fiverr thumbnail lab — research what thumbnail gigs/styles sell
- Music lab — research what genres/channels/tracks perform
- Blog/affiliate lab — research search demand and affiliate products
- Supplement lab — research winning products, claims, ads, and compliance risk
- Game asset lab — research marketplace demand

In Agentarium, Nova is the general **Market Intelligence Engine** feeding the whole ecosystem.
