/**
 * Editorial layers that turn each short guide into a practical decision aid.
 * These notes deliberately describe research and planning, not invented first-hand experience.
 */
export const guideEditorial = {
  'first-trip-korea-checklist': {
    purpose: 'Use this page to separate decisions that can block entry from decisions that can stay flexible until you arrive.',
    decisionQuestions: [
      'Which entry requirement applies to my passport, purpose and length of stay?',
      'Can I reach my first-night address if my phone, card or planned connection fails?',
      'Which bookings need certainty, and which plans should remain adjustable?'
    ],
    verificationSteps: [
      'Check entry rules with the Korean mission or official immigration service responsible for your circumstances.',
      'Open your saved accommodation address in a map before departure, including the final walk from the stop.',
      'Test data and one payment method while airport support or reliable Wi-Fi is still available.'
    ],
    failurePlan: [
      ['Your flight is delayed', 'Recheck the last practical connection, then use the late-check-in contact and preselected backup rather than rushing for an old timetable.'],
      ['A card is declined', 'Try the separate payment method, keep the receipt, and contact the issuer through its official number if the decline repeats.'],
      ['The phone has no data', 'Use the offline Korean address, airport Wi-Fi or an official help desk while activating the saved backup connection.']
    ],
    faq: [
      ['Should I plan every day before flying?', 'No. Secure entry, the first night, connectivity and a reliable payment path first. Leave weather-sensitive sightseeing flexible.'],
      ['Is a blog enough to confirm visa eligibility?', 'No. Use the official authority for your nationality and purpose; this page only helps you organize the check.'],
      ['What is the one paper backup worth carrying?', 'A Korean address, accommodation phone number and emergency details separated from your phone.']
    ]
  },
  'incheon-airport-to-seoul': {
    purpose: 'Use the whole door-to-door journey—not the vehicle headline time—to choose an arrival transfer.',
    decisionQuestions: [
      'What is the nearest useful stop to the actual accommodation entrance?',
      'How much luggage, walking and stair use can the traveler manage?',
      'Will the service still be realistic after immigration, baggage and terminal movement?'
    ],
    verificationSteps: [
      'Confirm the terminal and service date on the airport or operator page.',
      'Compare the final 500 metres in a local map, including the station exit and road crossings.',
      'Save the official taxi-stand location and accommodation address in Korean as a fallback.'
    ],
    failurePlan: [
      ['The train route has too many stairs', 'Change to a bus stop nearer the address or budget an official taxi for the final leg.'],
      ['The bus is full or delayed', 'Use the operator information desk and compare the next confirmed service with your saved rail option.'],
      ['The last departure is no longer practical', 'Do not treat a scheduled departure as reachable; use the confirmed taxi queue, airport hotel or late check-in plan.']
    ],
    faq: [
      ['Is rail always cheapest?', 'Not necessarily. Include the final transfer, luggage effort and the cost shared by a group when comparing.'],
      ['Can I rely on the arrival time shown by my airline?', 'No. Add immigration, baggage, customs, terminal movement and ticket-finding time.'],
      ['What should I show a driver?', 'The accommodation name and road address in Korean, not only an English map pin.']
    ]
  },
  'incheon-airport-after-midnight': {
    purpose: 'Use a late-arrival cutoff so a public-transport plan does not depend on every queue moving perfectly.',
    decisionQuestions: [
      'What time will the traveler realistically reach the public area, not just land?',
      'What is the confirmed last service for this terminal and date?',
      'Which backup is safe, legal and compatible with late check-in?'
    ],
    verificationSteps: [
      'Check the airport and operator pages on the travel date for the exact terminal.',
      'Add immigration, baggage, customs, walking and ticket-purchase time to the landing time.',
      'Confirm that accommodation reception or self check-in remains available after midnight.'
    ],
    failurePlan: [
      ['Immigration takes longer than expected', 'Use the cutoff you set before departure; do not run through an unfamiliar terminal for a marginal connection.'],
      ['The hotel stops accepting late arrivals', 'Call the confirmed number or use the documented self check-in instructions before leaving the airport.'],
      ['A ride offer approaches you in arrivals', 'Decline unsolicited transport and use the signed official taxi area or another confirmed operator.']
    ],
    faq: [
      ['Does a midnight landing mean a midnight departure?', 'No. Landing is followed by several airport steps; plan from the time you can actually leave the terminal.'],
      ['Should I book a taxi in advance?', 'Only through a provider you can verify. Keep the official airport taxi area as a fallback.'],
      ['Is waiting at the airport always a bad option?', 'Not automatically. It can be safer than an unconfirmed connection, but check luggage, facilities and accommodation rules.']
    ]
  },
  'naver-map-for-foreigners': {
    purpose: 'Use local map data as a planning tool while keeping a human-readable address and an offline route as backups.',
    decisionQuestions: [
      'Do I have the Korean name or road address if an English search returns the wrong place?',
      'Can I identify the correct station exit, platform direction and final walking route?',
      'What will I do if the map pin, opening hours or mobile data is wrong?'
    ],
    verificationSteps: [
      'Search the accommodation and first destination before departure and save both.',
      'Compare the official venue page with the map listing for hours, closure notices and reservation requirements.',
      'Capture the final walking section and the Korean address for use without an active connection.'
    ],
    failurePlan: [
      ['English search shows several places', 'Use the Korean name from the venue or accommodation message, then compare the address and phone number.'],
      ['The route enters a huge station', 'Check the exit number and direction before descending to the platform; allow extra interchange time.'],
      ['The map says a place is open', 'Treat the official operator notice as the authority and call or check it for temporary closures.']
    ],
    faq: [
      ['Can a map app replace translation?', 'No. It can locate a place, but signs, menus and staff messages may still need translation.'],
      ['Should I save a pin or an address?', 'Save both. A pin helps navigation; a written Korean address helps a driver or staff member.'],
      ['Why use a Korean map if the interface is English?', 'Local place names and transit data can be easier to find with Korean search terms even when the interface is translated.']
    ]
  },
  'tmoney-card-guide': {
    purpose: 'Use this guide to distinguish ordinary local transit from services that need a separate reservation or ticket.',
    decisionQuestions: [
      'Is this trip an eligible city bus or metro journey, or a reserved/express service?',
      'How much stored value is enough without leaving a large balance?',
      'Does every traveler have a separate card for the same journey?'
    ],
    verificationSteps: [
      'Check the current card, top-up and refund rules with the official card provider.',
      'Confirm the transport operator for airport express, intercity rail and reserved travel.',
      'Test the card at a staffed station or retailer before relying on it for a time-critical transfer.'
    ],
    failurePlan: [
      ['A gate rejects the tap', 'Stop and ask staff rather than tapping repeatedly; show the card and route details.'],
      ['The balance is too low', 'Use an authorized top-up location and keep a separate payment method for the purchase.'],
      ['The service does not accept the card', 'Buy the required ticket through the operator and do not assume stored value covers the reservation.']
    ],
    faq: [
      ['Can one card be shared by a couple?', 'Not for the same journey. Each traveler needs a card when the system records individual entry and exit.'],
      ['Should I load a week of fares at once?', 'Usually start modestly, learn your route and check current refund or transfer conditions before adding more.'],
      ['Does a card work everywhere in Korea?', 'Acceptance depends on the service and region. Check the operator for the exact journey.']
    ]
  },
  'korea-esim-sim-wifi': {
    purpose: 'Choose connectivity by the phone, number and group constraints that actually matter—not by a plan label alone.',
    decisionQuestions: [
      'Is the phone unlocked and compatible with the exact eSIM or physical SIM?',
      'Does the traveler need data only, a voice-capable Korean number or resident identity verification?',
      'Who carries the connection and what happens when a group separates?'
    ],
    verificationSteps: [
      'Check the exact device model and carrier-lock status with the phone maker or carrier.',
      'Read the provider rules for activation start, speed reduction, tethering, voice and refunds.',
      'Test a webpage, map and required call before leaving the airport support area.'
    ],
    failurePlan: [
      ['The eSIM will not install', 'Do not delete the existing setup. Use the provider instructions or support channel and keep the physical backup available.'],
      ['Pocket Wi-Fi battery runs low', 'Carry the charger, use a power bank and keep an offline address for the next leg.'],
      ['A service requires resident verification', 'A temporary number may not solve it; use the service’s official eligibility path or another visitor-friendly option.']
    ],
    faq: [
      ['Is unlimited data always full speed?', 'No. Read fair-use and speed-reduction conditions; “unlimited” does not describe every network condition.'],
      ['Can a data-only eSIM receive calls?', 'Usually not in the same way as a voice plan. Check the exact product before purchase.'],
      ['Is pocket Wi-Fi best for a group?', 'It can be convenient when everyone stays together, but separation and battery life become shared failure points.']
    ]
  },
  'payments-in-korea': {
    purpose: 'Build a payment setup that survives a foreign-card decline, a cash-only merchant and a temporary wallet or phone problem.',
    decisionQuestions: [
      'Are the backup cards independent enough to survive an issuer or network problem?',
      'Which fees apply to foreign transactions, cash withdrawals and currency conversion?',
      'Where will a small cash reserve be useful without carrying the entire trip budget?'
    ],
    verificationSteps: [
      'Ask each card issuer about overseas use, PIN rules, fees and fraud controls before departure.',
      'Keep transaction alerts enabled and save the official issuer contact method offline.',
      'Use an authorized ATM or cashier and read the conversion and fee screen before confirming.'
    ],
    failurePlan: [
      ['A merchant declines a foreign card', 'Try the physical backup or another payment method once, then contact the issuer if declines continue.'],
      ['A cash machine adds an unexpected fee', 'Cancel before confirming when possible; use a different authorized machine and record the receipt.'],
      ['The phone wallet is unavailable', 'Use the separately stored physical card and cash reserve; never keep every payment path in one device.']
    ],
    faq: [
      ['Should I exchange all money before the trip?', 'No universal amount fits every itinerary. Carry a modest reserve and use a transparent, authorized exchange or withdrawal option.'],
      ['Why choose Korean won at a terminal?', 'Dynamic currency conversion can add another conversion layer. Compare the options and your issuer’s policy.'],
      ['Is a card logo a guarantee of acceptance?', 'No. Acceptance depends on the merchant terminal, network, issuer and transaction conditions.']
    ]
  },
  'essential-apps-first-week-korea': {
    purpose: 'Install only the tools needed for a real first-week problem, then create an offline backup for each critical task.',
    decisionQuestions: [
      'Which app solves a problem today—navigation, translation, transport or emergency contact?',
      'Does the app require a Korean number, resident identity or local payment method?',
      'What information must still be available if the app signs out or the phone loses data?'
    ],
    verificationSteps: [
      'Complete one real task in each essential app before departure instead of only installing it.',
      'Read the sign-up and permission screens; installation does not prove every feature works for visitors.',
      'Save bookings, addresses and emergency contacts outside the app as screenshots or paper notes.'
    ],
    failurePlan: [
      ['A resident-only app blocks sign-up', 'Use the official visitor-facing service or a browser and do not enter another person’s identity information.'],
      ['The app requests excessive permissions', 'Deny permissions unrelated to the task and check whether the service still works.'],
      ['The app cannot load', 'Use the saved Korean address, booking evidence and offline route while restoring data or Wi-Fi.']
    ],
    faq: [
      ['Do I need every popular Korean app?', 'No. A small reliable toolkit is safer than many accounts you cannot recover.'],
      ['Is a local number the same as resident verification?', 'No. A number may support calls or sign-up while identity checks still require resident records.'],
      ['What should be offline first?', 'Accommodation address, airport route, reservations, insurance contact and emergency details.']
    ]
  },
  'first-week-living-korea': {
    purpose: 'Sequence first-week tasks by dependency so a new resident does not repeatedly visit providers without the required record.',
    decisionQuestions: [
      'Which tasks depend on immigration status, address proof or a local phone record?',
      'Which document names and spellings must remain consistent across services?',
      'Which obligation has a date or appointment that cannot be safely postponed?'
    ],
    verificationSteps: [
      'Use Hi Korea or the Immigration Service for the process that applies to the actual status and stay purpose.',
      'Ask each provider what exact missing document blocks the next step and write the answer down.',
      'Store copies securely and avoid uploading residence documents to informal chats or public forums.'
    ],
    failurePlan: [
      ['A provider says the record is missing', 'Ask for the required document name and official next step; do not keep retrying with unrelated paperwork.'],
      ['Names differ between systems', 'Resolve the spelling with the issuing organization before building more accounts on top of the mismatch.'],
      ['A deadline or appointment is unclear', 'Use the official immigration contact path and preserve the appointment evidence.']
    ],
    faq: [
      ['Can every newcomer follow the same order?', 'No. Visa, address, work or study purpose and appointment availability change the sequence.'],
      ['Should I use a friend’s account while waiting?', 'Do not use another person’s identity or account as a workaround; ask the responsible provider for a legitimate temporary route.'],
      ['Why emphasize consistent spelling?', 'Different names can make mobile, banking and government verification fail even when the underlying person is the same.']
    ]
  },
  'gyeongbokgung-first-visit': {
    purpose: 'Turn a palace visit into a readable sequence of spaces and decisions rather than a race to photograph every building.',
    decisionQuestions: [
      'What official closure, admission or program notice applies on the chosen date?',
      'Which route gives enough context without exhausting the visitor?',
      'Which one nearby addition supports the visit instead of fragmenting it?'
    ],
    verificationSteps: [
      'Check the Royal Palaces and Tombs Center for closure, admission, ceremony and guided-program updates.',
      'Plan around walking, weather and stone surfaces; allow time for the museum or one nearby stop.',
      'Follow site-specific photography, access and visitor-conduct notices over generic travel advice.'
    ],
    failurePlan: [
      ['A gate or program is closed', 'Use the official notice to reshape the route around open courtyards or the museum rather than forcing access.'],
      ['Rain or heat changes the pace', 'Shorten the outdoor route, protect the visit with an indoor stop and keep the second attraction optional.'],
      ['A photo opportunity blocks other visitors', 'Step aside, keep doorways clear and treat an active religious or cultural space with priority over the shot.']
    ],
    faq: [
      ['How long should a first visit take?', 'A focused half day is a useful starting shape, but mobility, weather and program choices matter more than a fixed duration.'],
      ['Is wearing hanbok permission to ignore site rules?', 'No. Clothing does not override barriers, photography rules or access restrictions.'],
      ['Should I combine every nearby palace?', 'Usually not. One deeper visit and one compatible nearby stop is easier to understand than a rushed collection.']
    ]
  }
};

/** A source is linked for a defined job, so readers can repeat the check. */
export const guideSourceRoles = {
  'first-trip-korea-checklist': ['Entry and immigration sources: confirm eligibility and current obligations.', 'Visit Korea: cross-check visitor-facing arrival and travel information.', 'The guide: organize decisions and backups; it is not the final authority.'],
  'incheon-airport-to-seoul': ['Airport transport page: confirm terminal services and official access points.', 'AREX: check rail route and service details.', 'Seoul transport information: understand the city-side connection.'],
  'incheon-airport-after-midnight': ['Airport transport page: check current late service and terminal information.', 'Operator pages: confirm the exact last practical departure for the date.', 'The guide: calculate arrival friction and choose a legitimate backup.'],
  'naver-map-for-foreigners': ['Naver Map: plan local routes, exits and Korean place searches.', 'Visit Seoul: compare visitor-facing transport context.', 'Venue operator: confirm hours and closures; a map listing is not proof of entry.'],
  'tmoney-card-guide': ['T-money: confirm current card, balance, top-up and refund conditions.', 'Seoul transport information: identify the services covered by the local transit network.', 'The guide: flag exceptions that need a separate operator ticket.'],
  'korea-esim-sim-wifi': ['Visit Korea: provide visitor-oriented communication context.', 'Korea Communications Commission: identify regulator-level information and consumer cautions.', 'Provider terms: confirm the exact device, activation and speed conditions before paying.'],
  'payments-in-korea': ['Card issuer: confirm overseas use, fees, PIN and fraud controls.', 'ATM or merchant: read the live fee and currency-conversion screen before confirming.', 'The guide: design independent payment paths; acceptance can vary by transaction.'],
  'essential-apps-first-week-korea': ['The app publisher: read current sign-up, permission and account requirements.', 'Official transport or emergency service: use the responsible operator for critical tasks.', 'The guide: create offline backups and avoid depending on resident-only features.'],
  'first-week-living-korea': ['Korea Immigration Service and Hi Korea: follow the process for the actual stay status.', 'Financial regulator or provider: confirm identity and account requirements.', 'The guide: sequence dependencies; it does not replace an individual administrative decision.'],
  'gyeongbokgung-first-visit': ['Royal Palaces and Tombs Center: confirm closure, admission and program notices.', 'National Palace Museum: add historical context and a weather-safe nearby option.', 'The guide: shape a respectful route; site-specific instructions always take priority.']
};
