export const guideUtilities = {
  'first-trip-korea-checklist': {
    testedFor:'Travelers building a resilient arrival plan; requirements still depend on passport and trip purpose.',
    steps:[
      ['Confirm entry eligibility','Use the Korean embassy or consulate responsible for your residence. Save the result with your passport copy; a blog is never the final authority for entry.'],
      ['Save the first-night address twice','Keep the accommodation name, Korean road address and phone number both on your phone and on paper.'],
      ['Choose one transfer and one backup','Plan from the airport to the actual door, including the last walk, stairs and luggage—not merely to “Seoul.”'],
      ['Build two independent payment paths','Carry two physical cards from different networks or issuers and a modest amount of Korean won. Store them separately.'],
      ['Activate data before leaving the airport','Open a fresh web page and load your saved accommodation in a map. A signal icon alone does not prove data works.']
    ],
    pack:['Passport and entry evidence','Accommodation address in Korean','Offline insurance and emergency details','Two payment methods stored separately','Charging cable and compatible adapter','Airport transfer backup budget'],
    avoid:['Booking a tight first-night activity','Depending on one phone for every document','Assuming every Korean app accepts a foreign account','Using an old blog screenshot as an entry rule'],
    phrases:[['Please take me to this address.','이 주소로 가 주세요.'],['Could you write the address in Korean?','주소를 한국어로 적어 주시겠어요?']]
  },
  'incheon-airport-to-seoul': {
    testedFor:'A decision framework, not a live timetable. Always check the operator for your terminal and travel date.',
    steps:[
      ['Locate the exact destination','Copy the Korean road address and find the nearest useful station or airport-bus stop.'],
      ['Inspect the final 500 metres','Check hills, stairs, road crossings and whether the accommodation entrance is easy to identify.'],
      ['Add arrival friction','Budget time for immigration, baggage, terminal movement, ticket purchase and finding the platform or stop.'],
      ['Compare the whole journey','Rail is predictable, a bus may remove transfers, and a taxi can make sense when a group shares the cost.'],
      ['Save a fallback','Keep the official taxi-stand location or an airport-area hotel option if the final service becomes unrealistic.']
    ],
    pack:['Korean destination address','Terminal number','Operator page saved offline','Luggage count','Backup transport budget'],
    avoid:['Choosing by headline travel time alone','Confusing AREX all-stop and express services','Assuming a bus stop is next to the accommodation','Following unsolicited transport offers'],
    phrases:[['Which exit should I use for this address?','이 주소로 가려면 몇 번 출구로 나가야 하나요?'],['Does this bus stop near this address?','이 버스가 이 주소 근처에 정차하나요?']]
  },
  'incheon-airport-after-midnight': {
    testedFor:'Flights whose scheduled landing is too close to the last practical public-transport connection.',
    steps:[
      ['Start with landing time','Add immigration, baggage collection, customs and terminal movement before comparing departures.'],
      ['Check the exact date','Use the airport and operator sites. Weekends, holidays, disruptions and terminal changes matter.'],
      ['Set a no-rush cutoff','If reaching the stop requires perfect queues and navigation, treat that service as unavailable.'],
      ['Choose a legitimate backup','Compare an official taxi queue, confirmed late service, airport hotel or waiting for morning.'],
      ['Notify the accommodation','Confirm late check-in instructions and a phone number that works after reception hours.']
    ],
    pack:['Late check-in confirmation','Destination in Korean','Terminal exit and taxi stand','Hotel or taxi budget','Charged phone and data'],
    avoid:['Treating landing time as station-arrival time','Relying on a cached timetable','Accepting an unmarked ride in arrivals','Arriving without a late check-in plan'],
    phrases:[['Please use the meter.','미터기로 가 주세요.'],['Is there a late-night surcharge?','심야 할증이 있나요?']]
  },
  'naver-map-for-foreigners': {
    testedFor:'Visitors using the English interface while keeping Korean names as a search fallback.',
    steps:[
      ['Install and set language early','Do this before the trip, then search one real destination to expose account or spelling problems.'],
      ['Copy the Korean place name','Use the venue’s official Korean page or accommodation message when English search results are incomplete.'],
      ['Read the route in segments','Check station entrance, platform direction, transfer walk, exit number and the final walking section.'],
      ['Save critical destinations','Keep accommodation, airport terminal and first attraction in a named list.'],
      ['Capture the last walk','Save a screenshot and written address in case mobile data or the app fails.']
    ],
    pack:['Korean accommodation name','Road address rather than only a pin','Nearest station exit','Offline screenshot of final walk'],
    avoid:['Searching only one English spelling','Looking only at total travel time','Ignoring the bus direction','Assuming map opening hours prove a venue is open'],
    phrases:[['Is this the right direction for this station?','이 역으로 가는 방향이 맞나요?'],['Where is exit number three?','3번 출구가 어디예요?']]
  },
  'tmoney-card-guide': {
    testedFor:'Ordinary eligible metro and bus trips. Express, intercity and reservation-only services may require separate tickets.',
    steps:[
      ['Buy one card per traveler','A single stored-value card should not be passed between people during the same journey.'],
      ['Load a modest starting balance','Top up again after learning your actual travel pattern instead of storing a large unused amount.'],
      ['Tap in and out correctly','Transfer discounts depend on a complete journey record where exit tapping is required.'],
      ['Separate it from other cards','Present only the intended card to prevent errors or charging the wrong contactless card.'],
      ['Check exceptions before boarding','Airport express, intercity rail and reserved transport can use separate ticketing.']
    ],
    pack:['Small Korean-won cash reserve','One card per person','Route operator checked','Enough balance for the complete trip'],
    avoid:['Assuming T-money is a universal rail ticket','Letting the balance reach zero mid-route','Repeatedly tapping after a gate error','Loading more than the trip requires'],
    phrases:[['Please add 20,000 won to this card.','이 카드에 2만 원 충전해 주세요.'],['Can I use T-money for this trip?','이 구간에서 티머니를 사용할 수 있나요?']]
  },
  'korea-esim-sim-wifi': {
    testedFor:'Short-term visitors comparing connectivity; a Korean number does not necessarily provide resident identity verification.',
    steps:[
      ['Check the exact phone model','Confirm eSIM support, carrier lock status and supported network bands—not only the product family.'],
      ['Decide whether data is enough','Maps and messaging need data; reservations and calls may benefit from a voice-capable Korean number.'],
      ['Read activation rules','Check when the validity period begins, tethering limits, speed reductions and refund conditions.'],
      ['Protect the installation path','Keep the QR code and setup instructions offline and do not delete an eSIM until the trip is finished.'],
      ['Test before leaving support','Load a new page, make a required call and confirm tethering while airport staff or Wi-Fi is available.']
    ],
    pack:['Unlocked-phone confirmation','Exact model compatibility','QR code stored securely','APN instructions','Provider support channel'],
    avoid:['Buying a plan before checking lock status','Assuming “unlimited” means full speed forever','Expecting a temporary number to verify resident apps','Separating from the person carrying pocket Wi-Fi'],
    phrases:[['Does this plan include a Korean phone number?','이 요금제에 한국 전화번호가 포함되어 있나요?'],['Can this plan receive text messages?','이 요금제로 문자 수신이 가능한가요?']]
  },
  'payments-in-korea': {
    testedFor:'Visitors using foreign-issued cards. Acceptance depends on issuer, network, terminal and merchant.',
    steps:[
      ['Bring independent cards','Use different issuers or networks when possible and keep the backup away from the primary wallet.'],
      ['Know each card’s costs','Check foreign transaction, cash advance and ATM fees before travel.'],
      ['Keep a small cash reserve','Use it for cash-only purchases, transport top-ups or a temporary terminal failure—not as the entire strategy.'],
      ['Choose local currency','If a terminal offers home-currency conversion, compare carefully; local-currency charging often avoids an extra conversion layer.'],
      ['Respond to a decline calmly','Try the physical card, a second card or another payment method. Repeated attempts can trigger issuer security controls.']
    ],
    pack:['Two physical cards','Issuer contact method','PINs confirmed','Emergency Korean won','Transaction alerts enabled'],
    avoid:['Relying only on a mobile wallet','Carrying all cards together','Using an unfamiliar ATM without reading fees','Assuming a logo guarantees every transaction'],
    phrases:[['Can I pay by card?','카드로 결제할 수 있나요?'],['Please charge me in Korean won.','원화로 결제해 주세요.']]
  },
  'essential-apps-first-week-korea': {
    testedFor:'A minimal visitor toolkit; resident-only identity checks can block features even when an app installs successfully.',
    steps:[
      ['Install by problem','Start with navigation, translation, transport and emergency information rather than downloading every popular Korean app.'],
      ['Complete one real task','Save the accommodation in maps, translate a Korean notice and locate an official transport booking.'],
      ['Check account requirements','A local phone number and verified resident identity are different things. Read sign-up requirements before depending on an app.'],
      ['Limit permissions','Allow location, contacts, photos and notifications only when a used feature needs them.'],
      ['Create offline backups','Screenshot the address, first route, booking evidence and emergency contacts.']
    ],
    pack:['Korean map service','Translation with image support','Airline and airport app','Actual rail or bus operator','Insurance contact details'],
    avoid:['Depending on one super-app','Granting every permission','Assuming installation means registration will work','Saving critical bookings only inside an app'],
    phrases:[['Could you show me this on the map?','지도에서 여기를 보여 주시겠어요?'],['Could you write that in Korean?','한국어로 적어 주시겠어요?']]
  },
  'first-week-living-korea': {
    testedFor:'New residents sequencing tasks; exact obligations depend on immigration status, address and purpose of stay.',
    steps:[
      ['Secure reliable communication','Choose a temporary or long-term mobile setup without assuming it already supports identity verification.'],
      ['Stabilize the address','Keep the complete Korean address and confirm which residence or contract documents are available.'],
      ['Follow immigration instructions','Use Hi Korea or the Immigration Service for the process applying to your status and appointment.'],
      ['Keep names consistent','Use the same passport spelling across immigration, mobile and banking records whenever the system permits.'],
      ['Open services in dependency order','Ask each provider what exact missing record blocks the next step instead of retrying blindly.']
    ],
    pack:['Passport and stay documents','Korean address','Local contact number','Employment or study evidence','Copies stored securely'],
    avoid:['Using another person’s identity or account','Posting residence documents publicly','Assuming every visa has the same deadline','Signing a financial contract you cannot read'],
    phrases:[['Which document is missing?','어떤 서류가 부족한가요?'],['Could you write the required documents for me?','필요한 서류를 적어 주시겠어요?']]
  },
  'gyeongbokgung-first-visit': {
    testedFor:'A focused first visit. Opening, admission, tours and ceremonies should be rechecked on the official palace site.',
    steps:[
      ['Check the official notice','Confirm the weekly closing day, last admission and any weather or event changes.'],
      ['Begin with ceremonial space','Use the main axis and court to understand how architecture presented state authority.'],
      ['Move toward private space','Notice how courtyards, scale and access change around council and residential buildings.'],
      ['Choose one deeper stop','Add the palace museum, a guided program or one nearby neighborhood—not every landmark nearby.'],
      ['Leave before attention collapses','A focused half day produces more understanding than racing through multiple palaces.']
    ],
    pack:['Official notice checked','Comfortable shoes','Water and weather protection','One contextual question','Time for a museum or guided tour'],
    avoid:['Treating rented hanbok as permission to ignore rules','Blocking doorways for photos','Entering roped areas','Trusting an old ceremony schedule'],
    phrases:[['Is photography allowed here?','여기에서 사진을 찍어도 되나요?'],['Where does the English tour begin?','영어 해설은 어디에서 시작하나요?']]
  }
};
