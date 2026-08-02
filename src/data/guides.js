export const guides = [
  {slug:'first-trip-korea-checklist',category:'start',title:'Your First Trip to Korea: A Practical Pre-Departure Checklist',description:'A step-by-step plan for entry documents, connectivity, payments, transport and your first 24 hours in Korea.',readTime:'6 min read',updated:'July 28, 2026',featured:true},
  {slug:'incheon-airport-to-seoul',category:'visit',title:'Incheon Airport to Seoul: Rail, Bus or Taxi?',description:'Choose the right transfer by destination, arrival time, luggage and total door-to-door effort.',readTime:'6 min read',updated:'July 28, 2026',featured:true},
  {slug:'incheon-airport-after-midnight',category:'visit',title:'Incheon Airport to Seoul After Midnight',description:'Build a late-arrival plan around immigration time, confirmed last departures and a realistic backup.',readTime:'5 min read',updated:'July 28, 2026'},
  {slug:'naver-map-for-foreigners',category:'visit',title:'How to Use Naver Map as a Foreigner',description:'Search Korean addresses, read transit routes and prepare navigation backups before leaving Wi-Fi.',readTime:'5 min read',updated:'July 28, 2026'},
  {slug:'tmoney-card-guide',category:'visit',title:'T-money Card Guide for First-Time Visitors',description:'Understand what the card covers, how transfers work and where a separate ticket is still required.',readTime:'5 min read',updated:'July 28, 2026'},
  {slug:'korea-esim-sim-wifi',category:'visit',title:'Korea eSIM, SIM Card or Pocket Wi-Fi?',description:'Choose connectivity by phone compatibility, local-number needs, group size and failure risk.',readTime:'6 min read',updated:'July 28, 2026'},
  {slug:'payments-in-korea',category:'visit',title:'Cash, Cards and Mobile Payments in Korea',description:'Build a payment setup that survives foreign-card rejection, cash-only situations and transport top-ups.',readTime:'6 min read',updated:'July 28, 2026'},
  {slug:'essential-apps-first-week-korea',category:'start',title:'Essential Apps for Your First Week in Korea',description:'Install a small toolkit for maps, translation, transport and emergencies without relying on resident-only accounts.',readTime:'5 min read',updated:'July 28, 2026'},
  {slug:'first-week-living-korea',category:'live',title:'Your First Week Living in Korea: The Right Order',description:'A dependency-aware plan for mobile service, address records, residence documents and banking.',readTime:'6 min read',updated:'July 28, 2026'},
  {slug:'gyeongbokgung-first-visit',category:'culture',title:'Gyeongbokgung Palace: A First-Visit Strategy',description:'Use a focused route, official closure checks and cultural context to make a first palace visit worthwhile.',readTime:'5 min read',updated:'July 28, 2026'},
];

export const categoryNames={start:'Start here',visit:'Visit Korea',live:'Live in Korea',culture:'Culture & heritage'};
export const byCategory=(category)=>guides.filter((guide)=>guide.category===category);
export const getGuide=(slug)=>guides.find((guide)=>guide.slug===slug);
