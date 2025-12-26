import type { Phase } from '@/types/roadmap';

export const phases: Phase[] = [
  {
    number: 1,
    title: 'Foundation',
    timeframe: 'Weeks 1-4',
    milestones: [
      {
        id: 'position-yourself',
        phase: 1,
        title: 'Position Yourself',
        description: 'Establish your identity as a Fractional AI Officer',
        tasks: [
          {
            id: 'define-niche',
            title: 'Define your niche (target businesses $1M-$50M revenue)',
            guidance: `Choose ONE specific industry or business type to focus on. Good niches include:
• Home services (HVAC, plumbing, roofing)
• Med spas & elective healthcare
• Law firms (under 50 attorneys)
• Real estate brokerages
• E-commerce brands ($2M-$20M revenue)
• B2B SaaS companies ($1M-$10M ARR)

Write down: What industry? What size companies? What's their main pain point?`,
            chapterSlug: 'picking-your-niche-who-you-serve-determines-what-y',
          },
          {
            id: 'craft-ppp',
            title: 'Craft your Promise, Process, Proof (PPP framework)',
            guidance: `Create your PPP statement:

PROMISE: "I help [niche] achieve [specific outcome] without [pain point]"
Example: "I help 20-person companies add $500K in profit without adding staff"

PROCESS (3 steps max):
1. Assess - Run AI Growth & Profit Assessment
2. Roadmap - Build custom 90-day AI strategy
3. Advise - Monthly advisory to ensure execution

PROOF: List 1-3 results, testimonials, or case studies you can reference`,
            chapterSlug: 'crafting-a-premium-offer-the-promise-process-and-p',
          },
          {
            id: 'update-linkedin',
            title: 'Update LinkedIn profile with Fractional AI Officer positioning',
            guidance: `Update these LinkedIn sections:

HEADLINE: "Fractional AI Officer | I help [niche] [outcome]"
Example: "Fractional AI Officer | I help law firms recover 20+ hours/week without adding staff"

BANNER: Create a simple banner with your promise statement

ABOUT SECTION:
- Open with your authority statement
- Explain who you help and the outcome
- Describe your 3-step process
- End with a call to action

EXPERIENCE: Add "Fractional AI Officer" as your current role`,
          },
          {
            id: 'authority-statement',
            title: 'Write your authority statement (who you help + outcome)',
            guidance: `Write a 1-2 sentence authority statement you can use everywhere:

Formula: "I'm a Fractional AI Officer. I help [specific niche] [achieve outcome] by [your process]."

Examples:
• "I'm a Fractional AI Officer. I help law firms double their billable hours without adding staff."
• "I'm a Fractional AI Officer. I help e-commerce brands increase repeat purchases without more ad spend."
• "I'm a Fractional AI Officer. I help home service companies close faster without chasing leads."

Practice saying this out loud until it feels natural.`,
            chapterSlug: 'crafting-the-messaging-that-sells-without-sounding',
          },
          {
            id: 'assessment-framework',
            title: 'Build AI Growth & Profit Assessment framework',
            guidance: `Create your assessment template with these sections:

1. DISCOVERY QUESTIONS (ask in initial call):
   - Where are you bleeding time?
   - Where are you missing revenue?
   - What's keeping you up at night?
   - Where are competitors beating you?

2. PROCESS MAPPING: Document their current workflows for sales, marketing, operations, customer service

3. GAP ANALYSIS: Identify friction points and inefficiencies

4. MONETIZE THE GAP: Put a dollar amount on each gap
   Formula: Hours wasted × hourly cost × 12 months = Annual waste

5. ROADMAP: 3-5 AI recommendations with expected ROI

Price: $1,000-$5,000 for the assessment`,
            chapterSlug: 'the-100k-offer-stack-what-to-sell-and-how-to-price',
          },
        ],
      },
      {
        id: 'build-offer',
        phase: 1,
        title: 'Build Your Offer',
        description: 'Create your service packages and pricing',
        tasks: [
          {
            id: 'set-pricing',
            title: 'Set pricing: $2,500 assessment, $5K-$7.5K/month advisory',
            guidance: `Set your pricing structure:

ENTRY POINT - AI Growth & Profit Assessment:
• Price: $2,500 (can range $1,000-$5,000)
• Deliverable: Written report with gaps identified and ROI projections

CORE OFFER - Monthly Advisory Retainer:
• Price: $5,000-$7,500/month to start
• Term: 12-month minimum commitment
• Includes: Monthly strategy call, roadmap updates, vendor oversight

PREMIUM - Annual Contract:
• Price: $7,500-$10,000/month
• Term: 24-36 month commitment
• Includes: Everything above + priority access + quarterly reviews

Write down YOUR prices for each tier.`,
            chapterSlug: 'the-100k-offer-stack-what-to-sell-and-how-to-price',
          },
          {
            id: 'assessment-template',
            title: 'Create assessment template (discovery questions, report format)',
            guidance: `Build your assessment deliverable template:

COVER PAGE:
• Client name, date, your branding

EXECUTIVE SUMMARY:
• Key findings in 3-5 bullet points
• Total annual profit gap identified

CURRENT STATE ANALYSIS:
• Process maps for key workflows
• Pain points identified

GAP ANALYSIS (the money section):
• Gap 1: [Description] - $X/year lost
• Gap 2: [Description] - $X/year lost
• Gap 3: [Description] - $X/year lost
• TOTAL PROFIT GAP: $XXX,XXX/year

AI ROADMAP:
• Recommended solutions for each gap
• Expected ROI for each
• Implementation timeline

NEXT STEPS:
• Advisory retainer proposal
• Your contact info`,
          },
          {
            id: 'define-process',
            title: 'Define your 3-step process (Assess, Roadmap, Advise)',
            guidance: `Document your exact process:

STEP 1: ASSESS (Week 1-2)
• 60-90 min discovery call
• Process documentation
• Gap analysis
• Deliverable: Written assessment report

STEP 2: ROADMAP (Week 3-4)
• Present findings to stakeholders
• Prioritize initiatives by ROI
• Create 90-day implementation plan
• Deliverable: AI Strategy Roadmap

STEP 3: ADVISE (Ongoing)
• Monthly 60-min strategy calls
• Vendor/tool recommendations
• Implementation oversight
• Progress tracking and ROI reporting

Create a simple one-pager explaining these 3 steps.`,
            chapterSlug: 'crafting-a-premium-offer-the-promise-process-and-p',
          },
          {
            id: 'roi-stories',
            title: 'Prepare 2-3 ROI stories/examples for sales conversations',
            guidance: `Prepare stories you can tell on sales calls:

STORY FORMAT:
1. Situation: "I worked with a [type of business] that was struggling with [problem]"
2. Problem: "They were losing [specific amount] because of [specific issue]"
3. Solution: "We implemented [AI solution] to fix this"
4. Result: "Within [timeframe], they saved/gained [specific result]"

EXAMPLE STORY:
"I worked with a 20-person law firm losing leads because of slow follow-up. We found they were losing $600K/year in missed opportunities. We implemented an AI-powered lead response system. Within 90 days, their response time dropped from 48 hours to 15 minutes, and they closed 5 more deals per month."

Write out 2-3 stories like this (can be hypothetical initially).`,
            chapterSlug: 'case-studies-and-proof',
          },
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'First Clients',
    timeframe: 'Weeks 5-12',
    milestones: [
      {
        id: 'activate-outreach',
        phase: 2,
        title: 'Activate Outreach',
        description: 'Start generating leads and booking calls',
        tasks: [
          {
            id: 'linkedin-posting',
            title: 'Post on LinkedIn 3-5x per week',
            guidance: `Create a content calendar with these post types:

MONDAY: Industry insight
"Most [niche] businesses are wasting $X on [problem]. Here's why..."

WEDNESDAY: How-to / Educational
"3 ways AI can fix [specific pain point] in your [niche] business"

FRIDAY: Story / Case study
"A [niche] business came to me losing $X/year. Here's what we did..."

TIPS:
• Keep posts under 200 words
• Use line breaks for readability
• End with a question or CTA
• Respond to every comment within 2 hours
• Post between 8-10am your audience's timezone`,
            chapterSlug: 'the-client-acquisition-engine-how-to-get-clients-w',
          },
          {
            id: 'outreach-messages',
            title: 'Send 10-20 personalized outreach messages per week',
            guidance: `Daily outreach routine (30 min/day):

FIND PROSPECTS:
• Search LinkedIn for your niche + location
• Look at who's engaging with competitors
• Check industry groups

MESSAGE TEMPLATE:
"Hey [Name], I noticed you run [company] in [niche]. I work with similar businesses helping them [outcome].

I just helped a [similar company] uncover $300K in hidden profit gaps using AI.

Would you be open to a quick 15-min call to see if I can find similar opportunities for you?"

TRACK:
• Send 10-20 messages per week
• Follow up after 3-5 days if no response
• Track responses in a spreadsheet`,
            chapterSlug: 'the-client-acquisition-engine-how-to-get-clients-w',
          },
          {
            id: 'network-outreach',
            title: 'Reach out to 50 people in your existing network',
            guidance: `Make a list of 50 people who might know your ideal clients:

CATEGORIES:
• Past colleagues and bosses
• Friends who own businesses
• Family connections
• People from networking events
• LinkedIn connections in your niche

MESSAGE:
"Hey [Name], hope you're doing well! I've started helping [niche] businesses find hidden profit opportunities using AI strategy.

Do you know any [niche] business owners who might be struggling with [common problem]? I'd love an intro if so.

Either way, let's catch up soon!"

Track who you've contacted and any referrals.`,
          },
          {
            id: 'discovery-calls',
            title: 'Book 3-5 discovery calls per week',
            guidance: `Your goal: 3-5 calls per week

BOOKING PROCESS:
1. Use Calendly or Cal.com for scheduling
2. Set 30-min slots for discovery calls
3. Send confirmation email with what to expect

PRE-CALL PREP:
• Research their company (5 min)
• Check their LinkedIn
• Note 2-3 potential pain points to explore

CALL AGENDA:
• 5 min: Rapport building
• 15 min: Discovery questions
• 5 min: Pitch your assessment
• 5 min: Handle objections & close

Track: Calls booked, calls completed, assessments sold`,
            chapterSlug: 'running-high-converting-sales-calls',
          },
        ],
      },
      {
        id: 'close-first-deals',
        phase: 2,
        title: 'Close Your First Deals',
        description: 'Convert prospects into paying clients',
        tasks: [
          {
            id: 'sales-framework',
            title: 'Practice the sales call framework (Rapport, Discovery, Pitch, Close)',
            guidance: `Master this 4-part call structure:

1. RAPPORT (5 min):
"Thanks for taking the time. Before we dive in, tell me a bit about [company] and your role."

2. DISCOVERY (15 min):
• "Where are you bleeding time?"
• "Where are you missing revenue?"
• "What's keeping you up at night?"
• "If you could wave a magic wand, what would you fix first?"

3. PITCH (5 min):
"Based on what you've shared, here's what I think is happening... [summarize gaps]. I help businesses like yours fix exactly this through my AI Growth & Profit Assessment."

4. CLOSE (5 min):
"The assessment is $2,500. I'll map your processes, identify the gaps, put dollar amounts on them, and give you a clear roadmap. Want to get started this week?"

Practice this flow until it's natural.`,
            chapterSlug: 'running-high-converting-sales-calls',
          },
          {
            id: 'monetize-gap-script',
            title: 'Memorize the "monetize the gap" script',
            guidance: `Learn this script for putting dollar amounts on problems:

"Let me do some quick math with you...

You said your team spends about [X hours] per week on [task].
That's [X × 52] hours per year.
At an average cost of $[hourly rate] per hour, that's $[total] per year.

And that's just ONE process.

When we run the full assessment, we typically find $200K-$500K in annual waste or missed revenue.

My assessment is $2,500. If I find even 10% of what I typically find, that's a 10x return on your investment. Make sense?"

Practice saying this with real numbers until it flows naturally.`,
            chapterSlug: 'running-high-converting-sales-calls',
          },
          {
            id: 'objection-handling',
            title: 'Prepare objection handling responses (Time, Budget, Knowledge)',
            guidance: `Memorize responses to the Big 3 objections:

"WE DON'T HAVE TIME":
"I get it. But are you busy making money or busy wasting time? Because what we just found is $[X] in annual waste. You don't have a time problem—you have a strategy problem."

"WE DON'T HAVE THE BUDGET":
"Let's look at the math. You're losing $[X] per year. My assessment is $2,500. The question isn't 'Can you afford $2,500?' It's 'Can you afford to keep losing $[X]?'"

"WE'RE NOT READY FOR AI":
"Perfect—that's exactly why you need me. My job is to cut through the noise and give you a roadmap that makes sense. You don't need to know AI. That's what I'm here for."

Then: STAY SILENT. Let them respond.`,
            chapterSlug: 'running-high-converting-sales-calls',
          },
          {
            id: 'first-clients',
            title: 'Close your first 1-3 paying clients',
            guidance: `Your milestone: Sign 1-3 paying clients

CHECKLIST:
□ First assessment sold ($1,000-$2,500)
□ Assessment delivered successfully
□ First retainer signed ($5,000+/month)
□ Second client acquired
□ Third client acquired

AFTER EACH CLOSE:
1. Send welcome email with next steps
2. Schedule kickoff call
3. Send invoice/contract
4. Add to your client tracker
5. Celebrate! 🎉

Record details: Client name, deal size, how you found them, what worked.`,
          },
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'Scale to $50K/Month',
    timeframe: 'Months 4-12',
    milestones: [
      {
        id: 'systemize-delivery',
        phase: 3,
        title: 'Systemize Delivery',
        description: 'Create repeatable processes for client work',
        tasks: [
          {
            id: 'assessment-playbook',
            title: 'Build playbook for running assessments',
            guidance: `Document your assessment process step-by-step:

PRE-ASSESSMENT:
□ Send intake questionnaire
□ Request access to key systems (CRM, analytics)
□ Schedule stakeholder interviews

DURING ASSESSMENT (Week 1):
□ Conduct discovery interview (60-90 min)
□ Map current processes
□ Interview 2-3 team members
□ Review existing tools and data

ANALYSIS (Week 2):
□ Identify top 5-7 gaps
□ Calculate dollar impact for each
□ Research AI solutions
□ Build recommendation roadmap

DELIVERY:
□ Create assessment report
□ Schedule presentation meeting
□ Present findings
□ Pitch retainer

Save this as a checklist template you use for every client.`,
            chapterSlug: 'delivering-results-how-to-keep-clients-and-get-ref',
          },
          {
            id: 'roadmap-template',
            title: 'Create AI roadmap template for clients',
            guidance: `Build a reusable roadmap template:

PAGE 1: EXECUTIVE SUMMARY
• Current state snapshot
• Vision for AI-enabled future
• Total ROI potential

PAGE 2-4: INITIATIVE DETAILS
For each recommendation:
• Problem being solved
• Proposed AI solution
• Expected ROI
• Implementation timeline
• Required resources

PAGE 5: 90-DAY PLAN
Month 1: [Quick wins]
Month 2: [Core implementations]
Month 3: [Optimization]

PAGE 6: SUCCESS METRICS
• KPIs to track
• Baseline vs. target
• Review schedule

Create this in Google Slides or Canva for easy customization.`,
            chapterSlug: 'delivering-results-how-to-keep-clients-and-get-ref',
          },
          {
            id: 'monthly-agenda',
            title: 'Set up monthly advisory call agenda',
            guidance: `Create your standard monthly call structure:

MONTHLY ADVISORY CALL (60 min)

1. WINS & PROGRESS (10 min)
   • What's working?
   • Metrics review
   • Celebrate successes

2. ROADMAP UPDATE (15 min)
   • Status of current initiatives
   • Blockers or challenges
   • Adjust priorities if needed

3. NEW OPPORTUNITIES (15 min)
   • What's changed in their business?
   • New pain points?
   • AI landscape updates relevant to them

4. ACTION ITEMS (10 min)
   • What they need to do before next call
   • What you're handling
   • Any vendor coordination needed

5. Q&A (10 min)
   • Open questions
   • Confirm next meeting

Send meeting notes within 24 hours.`,
            chapterSlug: 'delivering-results-how-to-keep-clients-and-get-ref',
          },
          {
            id: 'roi-dashboard',
            title: 'Build ROI dashboard/calculator template',
            guidance: `Create a simple ROI tracking spreadsheet:

COLUMNS:
• Initiative name
• Baseline metric (before)
• Current metric (after)
• Improvement (%)
• Dollar impact
• Status

EXAMPLE ROWS:
• Lead response time: 48hrs → 15min = 68% improvement = $50K/year saved
• Manual data entry: 20hrs/wk → 2hrs/wk = 90% reduction = $35K/year saved
• Quote generation: 2 days → 2 hours = 85% faster = $25K/year in faster closes

DASHBOARD VIEW:
• Total ROI delivered: $XXX,XXX
• ROI vs. advisory fee: X:1 return
• Time to ROI: X months

Share this with clients monthly to prove your value.`,
          },
        ],
      },
      {
        id: 'grow-revenue',
        phase: 3,
        title: 'Grow Revenue',
        description: 'Increase client count and pricing',
        tasks: [
          {
            id: 'double-outreach',
            title: 'Double your outreach volume',
            guidance: `Scale your lead generation:

FROM → TO:
• LinkedIn posts: 3x/week → 5x/week
• Outreach messages: 10-20/week → 30-40/week
• Discovery calls: 3-5/week → 7-10/week

NEW CHANNELS TO ADD:
□ Email newsletter (weekly insights)
□ Podcast guesting (1-2/month)
□ Speaking at local events
□ Strategic partnerships (accountants, consultants)
□ Referral program for existing clients

TIME INVESTMENT:
• Content creation: 3 hours/week
• Outreach: 1 hour/day
• Networking: 2 hours/week

Track: Leads generated per channel, conversion rates.`,
          },
          {
            id: 'raise-prices',
            title: 'Raise prices to $7.5K-$10K/month',
            guidance: `When to raise prices:
• After you have 3+ successful clients
• When you have strong case studies
• When demand exceeds your capacity

HOW TO RAISE:
1. New clients get new pricing immediately
2. Existing clients: Raise at contract renewal
3. Grandfather loyal clients if needed

NEW PRICING:
• Assessment: $3,500-$5,000 (was $2,500)
• Monthly retainer: $7,500-$10,000 (was $5,000-$7,500)
• Annual contract: $10,000-$15,000/month

SCRIPT FOR PRICE INCREASE:
"My rates have increased based on demand and the results I'm delivering. New clients are paying $X. I'd like to keep you at $Y as a valued client, but we'll need to adjust to $Z at renewal."`,
            chapterSlug: 'the-100k-offer-stack-what-to-sell-and-how-to-price',
          },
          {
            id: 'add-clients-monthly',
            title: 'Add 1-2 new clients per month',
            guidance: `Build a predictable client acquisition engine:

MONTHLY TARGETS:
• Leads generated: 20-30
• Discovery calls: 10-15
• Assessments sold: 3-5
• Retainers closed: 1-2

PIPELINE TRACKING:
Create a simple CRM or spreadsheet:
• Lead name & company
• Source (LinkedIn, referral, etc.)
• Stage (Lead → Call → Assessment → Retainer)
• Deal size
• Next action & date

REVIEW WEEKLY:
• Pipeline value
• Conversion rates by stage
• Where leads are stalling
• Actions needed

At $7,500/month × 2 new clients/month = $180K ARR added per year`,
          },
          {
            id: 'collect-testimonials',
            title: 'Collect case studies and testimonials from clients',
            guidance: `After 90 days with each client, ask for:

1. VIDEO TESTIMONIAL (best):
"Would you mind recording a 2-minute video sharing your experience? Just answer: What was the problem? What did we do? What were the results?"

2. WRITTEN TESTIMONIAL:
"Could you write a few sentences about working with me? Focus on the results you've seen."

3. CASE STUDY (get permission):
• Before state (problems, metrics)
• What you implemented
• After state (improvements, ROI)
• Client quote

TEMPLATE ASK:
"Hey [Name], I'm building out some case studies and your results have been fantastic. Would you be open to me writing up a quick case study about how we [specific result]? I'll send it to you for approval before using it anywhere."

Store all testimonials in a "Proof" folder.`,
            chapterSlug: 'case-studies-and-proof',
          },
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'Cross $1M',
    timeframe: 'Year 2+',
    milestones: [
      {
        id: 'scale-beyond-you',
        phase: 4,
        title: 'Scale Beyond You',
        description: 'Build a team to handle more clients',
        tasks: [
          {
            id: 'document-sops',
            title: 'Document all processes in SOPs',
            guidance: `Create Standard Operating Procedures for everything:

SALES SOPs:
□ Lead qualification checklist
□ Discovery call script
□ Proposal template
□ Follow-up sequence

DELIVERY SOPs:
□ Client onboarding checklist
□ Assessment process (step-by-step)
□ Monthly call prep & agenda
□ Report templates

ADMIN SOPs:
□ Invoice & payment process
□ Contract templates
□ Client communication guidelines
□ Tool stack documentation

FORMAT:
Each SOP should have:
• Purpose
• Step-by-step instructions
• Templates/examples
• Common mistakes to avoid

Store in Notion, Google Drive, or similar.`,
            chapterSlug: 'scaling-your-advisory-business',
          },
          {
            id: 'hire-advisor',
            title: 'Hire or partner with junior advisor',
            guidance: `When you hit capacity (6-8 clients), add help:

OPTION 1: JUNIOR ADVISOR (Part-time)
• Handles: Research, assessment prep, report drafting
• You handle: Sales calls, client presentations, strategy
• Pay: $50-75/hour or revenue share (20-30%)

OPTION 2: STRATEGIC PARTNER
• Another advisor who handles overflow
• Split: 50/50 or 60/40
• You maintain client relationship

HIRING CRITERIA:
• Strong business acumen
• Good communication skills
• Basic AI/tech understanding
• Coachable

WHERE TO FIND:
• Your network
• LinkedIn posts
• Upwork (for project work first)
• Local business schools

Start with 1 client handoff, then scale.`,
            chapterSlug: 'scaling-your-advisory-business',
          },
          {
            id: 'train-team',
            title: 'Train team using your playbooks',
            guidance: `Create a training program:

WEEK 1: FOUNDATIONS
• Your positioning & offer
• Ideal client profile
• Company values & standards

WEEK 2: SALES
• Shadow your discovery calls
• Practice scripts
• Role-play objections

WEEK 3: DELIVERY
• Assessment process walkthrough
• Roadmap creation
• Monthly call structure

WEEK 4: HANDS-ON
• They run assessment with your oversight
• You review their work
• Feedback & coaching

ONGOING:
• Weekly 1:1 meetings
• Call recordings review
• Continuous improvement

Document everything they ask—these become FAQs.`,
            chapterSlug: 'scaling-your-advisory-business',
          },
          {
            id: 'long-term-contracts',
            title: 'Lock clients into 24-36 month terms',
            guidance: `Transition to longer contracts for stability:

WHY LONGER TERMS:
• Predictable revenue
• Deeper client relationships
• Better results (AI takes time)
• Higher lifetime value

HOW TO PITCH:
"AI transformation isn't a 90-day project—it's an ongoing journey. My most successful clients commit to 24-36 months because that's when the real compounding happens. In exchange for that commitment, I'll [discount/add value]."

INCENTIVES FOR LONGER TERMS:
• 10% discount on monthly rate
• Quarterly in-person strategy sessions
• Priority response times
• Additional team training included

CONTRACT TERMS:
• 24-month: $8,500/month (vs. $10K)
• 36-month: $7,500/month (vs. $10K)
• Annual payment: Additional 5% off`,
          },
        ],
      },
      {
        id: 'own-the-market',
        phase: 4,
        title: 'Own the Market',
        description: 'Become the go-to AI advisor in your space',
        tasks: [
          {
            id: 'second-niche',
            title: 'Expand into second niche/vertical',
            guidance: `Once you dominate one niche, expand:

WHEN TO EXPAND:
• You're the known name in niche #1
• You have 10+ clients in that niche
• Strong case studies and referrals
• Team can handle current load

CHOOSING NICHE #2:
• Adjacent to niche #1 (similar problems)
• Referral potential from niche #1
• Higher deal sizes possible
• Genuine interest/expertise

EXPANSION PLAYBOOK:
1. Update positioning for new niche
2. Create niche-specific case studies
3. Build new referral network
4. Hire niche-specific advisor
5. Rinse and repeat

Example: Law firms → Accounting firms → Professional services`,
          },
          {
            id: 'authority-content',
            title: 'Build authority content (podcast, speaking, articles)',
            guidance: `Become the recognized expert:

PODCAST:
• Guest on 2-4 podcasts/month in your niche
• Eventually: Launch your own show
• Repurpose clips for social media

SPEAKING:
• Local business events
• Industry conferences
• Chamber of commerce
• Webinars for partners

WRITING:
• LinkedIn articles (1-2/month)
• Guest posts on industry publications
• Eventually: Write a book

MEDIA KIT:
Create a one-pager with:
• Your bio
• Topics you speak on
• Past appearances
• Contact info

Track: Opportunities, reach, leads generated.`,
          },
          {
            id: 'partnership-ecosystem',
            title: 'Create partnership ecosystem',
            guidance: `Build strategic partnerships:

REFERRAL PARTNERS:
• Accountants/CPAs (they see financials, know who needs help)
• Business coaches
• Marketing agencies
• IT/MSP companies
• Management consultants

PARTNERSHIP STRUCTURE:
• You refer to them, they refer to you
• Formal: 10-20% referral fee
• Informal: Reciprocal introductions

HOW TO APPROACH:
"Hey [Name], I help [niche] with AI strategy. You probably see clients who could benefit from this but it's not your core service. Would you be open to a referral partnership where we send business each other's way?"

NURTURE:
• Monthly check-in calls
• Share wins and case studies
• Co-host webinars
• Joint content`,
          },
          {
            id: 'referral-system',
            title: 'Set up referral system',
            guidance: `Systematize client referrals:

REFERRAL PROGRAM:
• Offer: $500-$1,000 for each referral that becomes a client
• Or: One month free advisory for successful referral

WHEN TO ASK:
• After delivering a big win
• At the 90-day mark
• During positive monthly calls
• When they mention knowing others

SCRIPT:
"Hey [Name], you've been great to work with and I'm always looking to help more companies like yours. Do you know any other [niche] business owners who might be struggling with [problem]? I'd love an intro."

MAKE IT EASY:
• Email template they can forward
• LinkedIn message they can copy
• Your calendar link to include

TRACK:
• Who referred
• Who was referred
• Outcome
• Reward paid`,
          },
        ],
      },
    ],
  },
];

export function getTotalTasks(): number {
  return phases.reduce(
    (total, phase) =>
      total + phase.milestones.reduce((mTotal, m) => mTotal + m.tasks.length, 0),
    0
  );
}

export function getAllTaskIds(): { milestoneId: string; taskId: string }[] {
  const ids: { milestoneId: string; taskId: string }[] = [];
  phases.forEach((phase) => {
    phase.milestones.forEach((milestone) => {
      milestone.tasks.forEach((task) => {
        ids.push({ milestoneId: milestone.id, taskId: task.id });
      });
    });
  });
  return ids;
}
