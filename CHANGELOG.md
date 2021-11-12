
  * 0.10.8
  * Merge pull request #265 from RyanNerd/264-fix-warning-react-does-not-recognize-prop
  * 🐛 bug Unrecognized props on components
  * 🐛 bug Fixed a cosmetic 💄 issue in MedicineEdit
  * Merge pull request #261 from RyanNerd/258-handle-log-pillbox-simple
  * ♻ refactor MedicinePage `handleLogPillbox()`
  * ♻ refactor MedicinePage combined the logic in `<MedicineEdit>.onClose()` into `saveMedicine()`
  * Merge pull request #260 from RyanNerd/255-add-asyncwrapper-to-medicinepage
  * ♻ refactor MedicinePage to use `asyncWrapper()` for error control
  * ♻ refactor MedicinePage to use `asyncWrapper()` for error control.
  * 0.10.7
  * 📓 docs update the CHANGELOG.md
  * Merge pull request #257 from RyanNerd/254-recfactor-adddruglog-functions
  * ♻ refactor `addEditOtcLog()` into `AddEditDrugLog()` in MedicinePage
  * Merge pull request #256 from RyanNerd/refactor-handleLogOtcAmount-to-logamount
  * ♻ refactor `handleLogOtcDrugAmount() has been refactored int `handleLogDrugAmount() in MedicinePage
  * ♻ refactor `setLastTaken()` in MedicinePage is now declarative
  * ♻ refactor Remove unneded type guards
  * Merge pull request #253 from RyanNerd/244-set-the-activemed-item-build
  * ♻ refactor setActiveMed when the med dropdown list is created
  * 👗 style Change a variable from `n` to `medicineId` in DeleteMedicineModal
  * Merge pull request #251 from RyanNerd/249-medicinepage-refactor-delete-druglog
  * ♻ refactor DeleteDrugLogModal as a separate component in MedicinePage
  * 👗 style Renamed the Changelog Commit Guide
  * Merge pull request #250 from RyanNerd/245-medicine-page-code-improvement
  * 👗 style Props and arguments are more declarative
  * Merge pull request #248 from RyanNerd/246-ok-as-confirm
  * 👗 style Change  `a` to `isAccepted` for Confirm results
  * Merge pull request #247 from RyanNerd/243-checkout-grid-del-otc
  * 👗 style Remove OTC from CheckoutGrid.tsx
  * 👗 style Clean up code for Pages
  * 👗 style Code clean up Toasts
  * 👗 style Code clean up for Modals
  * 👗 style Code clean up for ListGroups
  * 👗 style Code Simplification for many components
  * 0.10.6
  * 🐛 bug Fix LastTakenButton not showing when hours taken === 0
  * 👗 style Code formatting changes
  * 📓 docs Created a Conventional Commit Guide to standardize commit messages and types
  * Merge pull request #242 from RyanNerd/changelog-create
  * Added 📄 CHANGELOG.md 📄 file
  * 0.10.5
  * Code Cleanup :broom:
  * Improve Client Selection Performance :bullettrain_side:
  * 0.10.4
  * Merge pull request #241 from RyanNerd/239-otc-delete
  * Allow OTC medicine to be deleted :bomb:
  * 0.10.3
  * Merge pull request #238 from RyanNerd/237-modal-improvements
  * Modal Improvements
  * Code Improvements for MedicineEdit
  * 0.10.2
  * Refactored the Checkout All Meds confirm modal
  * 0.10.1
  * Fix :wrench: inactive meds showing up in dropdown
  * 0.10.0
  * Merge pull request #235 from RyanNerd/198-soft-delete-medicine
  * Allow Medication to be Deleted :bomb:
  * Change tsconfig.json to not include comments :notebook: in the output
  * Code Clean Up :broom: `` - Use ` `${variable}` ` instead of string concatination - Moved TooltipContainer.tsx to a Container directory under Pages
  * Fix :wrench: problems found with inspections
  * MedicineDrugPage UI Improvement :lipstick:
  * MedicineEdit UI Improvements :lipstick:
  * UI :lipstick: Improvements for `<Confirm.Modal>`
  * Change how the search text is ClientPage is handled
  * 0.9.8
  * 0.9.7
  * ResidentGrid => ClientGrid Name change
  * Fix :wrench: Med Labels from Client dropdown printing all clients
  * 0.9.6
  * Merge pull request #234 from RyanNerd/224-inactive-meds-in-pillbox-item-grid
  * Fix :wrench: PillboxItemGrid showing inactive meds
  * Merge pull request #233 from RyanNerd/231-deconstruct-props-manage-drug-page
  * ManageDrugPage Improvements :sparkle:
  * 0.9.5
  * Confirm component Enhancement :sparkler:
  * 0.9.4
  * Merge pull request #232 from RyanNerd/227-conslidate-confirms
  * Consolidation of confirm modals
  * 0.9.3
  * Merge pull request #226 from RyanNerd/225-active-field-otc
  * UI change for Manage Rx and Manage OTC
  * Merge pull request #221 from RyanNerd/216-client-object
  * Get confirmation for checkout all if there are exiting checked out meds
  * MedicineEdit Improvements :sparkler:
  * Fixed a :bug: bug where if all medications are inactivated the Med dropdown would be empty showing the last active medication
  * - Changed the name of the `Client` type to `TClient` and moved it into global.d.ts - Added some documentation in RecordTypes.ts
  * Use a Client object that contains all the data for the client
  * Prevent tooltip from showing in printout for checkout all feature
  * Merge branch 'no-toast-printed'
  * 0.9.2
  * Prevent Toasts from showing in printouts
  * 0.9.1
  * Merge pull request #215 from RyanNerd/213-med-dropdown-checkout-indicator
  * UI :lipstick: enhancement for Med Dropdown
  * 0.9.0
  * Tweaking the Checkout All feature UI :lipstick:
  * 0.8.27
  * Remove ; from ManageDrugPage.tsx render
  * Merge pull request #214 from RyanNerd/143-checkout-meds-on-deactivate
  * All Medication Checkout Feature
  * PillPopover Improvements
  * Merge pull request #212 from RyanNerd/211-state-render-med-pb-list-group
  * Fix :wrench: state sync with MedicinePage and PillboxListGroup
  * Fix warnings :warning: in the React console
  * 0.8.26
  * Added `medicineOtcList` constant to MedicinePage
  * Global State moved up for PillboxCard
  * Simplify `gridLists` prop processing
  * 0.8.25
  * Merge pull request #210 from RyanNerd/209-pillbox-log-grid
  * Pillbox components use `gridLists` prop to reduce prop drilling
  * Last of the JSDoc linting rules and fixes :wrench:
  * More JSDoc linting rules and fixes :wrench:
  * 0.8.24
  * JSDoc linting rules and many fixes :wrench:
  * Even More linting settings and fixes
  * 0.8.23
  * More linting settings and fixes
  * Added ``'react-hooks/exhaustive-deps':'error'` to the linter
  * OverlayTrigger has a TS bug :bug: for required attributes, that aren't really required
  * 0.8.22
  * Added some plugins to the linter
  * 0.8.21
  * Merge pull request #206 from RyanNerd/201-show-pillbox-name
  * Show pillbox name in Grids
  * 0.8.20
  * Make it more obvious when in DEV mode
  * 0.8.19
  * Merge pull request #205 from RyanNerd/169-error-boundary
  * Experiment with <ErrorBoundary>
  * Merge pull request #204 from RyanNerd/tslint2eslint-pretty
  * Convert from tslint to eslint and using prettier
  * 0.8.18
  * Make all props in CheckoutGrid required
  * 0.8.17
  * Merge pull request #203 from RyanNerd/202-create-checkout-grid
  * Create CheckoutGrid
  * 0.8.16
  * Added missing hook dependancy
  * 0.8.15
  * Merge pull request #200 from RyanNerd/196-refactor-medlistgroup
  * Pillbox logging and UI Improvements
  * 0.8.14
  * Merge pull request #197 from RyanNerd/195-remove-local-storage
  * Pillbox Remove Local Storage
  * 0.8.13
  * Merge pull request #194 from RyanNerd/pillbox-log-history
  * Pillbox Drug Log History
  * 0.8.12
  * Merge pull request #192 from RyanNerd/190-ui-pillbox-listgroup-improvement
  * Log Pillbox and UI Improvements
  * 0.8.11
  * Only Log Pillbox Items if the medicine is active
  * Add Strength of drug to PillboxListGroup Card
  * History should include inactive drugs
  * 0.8.10
  * Merge pull request #189 from RyanNerd/188-fix-bs
  * BS Color Fix :wrench:
  * Revert "BS Color Fix"
  * BS Color Fix
  * 0.8.9
  * Capitalize Pillbox Name in dropdown
  * Merge pull request #187 from RyanNerd/checkout-badge
  * More Medicine Checkout Improvements
  * Merge pull request #184 from RyanNerd/checkout-badge
  * Add a badge to the Print Checkout buttons
  * Merge pull request #183 from RyanNerd/179-remove-med-checkout-tab
  * Remove Med Checkout Tab
  * Alert pillbox name was not capitalized
  * 0.8.8
  * Merge pull request #181 from RyanNerd/pillbox-ui-improvement
  * Pillbox UI :lipstick: Improvements
  * Merge pull request #180 from RyanNerd/druglog-notes-can-be-null
  * Fix :bug: issue where drugLog.Notes could be null
  * MedicinePage was pitching a fit about importing DrugLogHistory.tsx so this got renamed to MedDrugLogHistory.tsx
  * 0.8.7
  * Merge pull request #178 from RyanNerd/177-credentials-need-alert
  * LoginPage wasn't showing alert with failed credentials :lock:
  * Merge pull request #176 from RyanNerd/simple-ifs
  * Reformat :construction_worker: Code in several modules
  * 0.8.6
  * Merge pull request #175 from RyanNerd/manage-rx-toast
  * Add Toast :bread: to ManageDrugPage
  * 0.8.5
  * Merge pull request #174 from RyanNerd/disabled-spinner-children
  * DisabledSpinner UI :lipstick: Improvements
  * Merge pull request #173 from RyanNerd/med-dropdown-subtext
  * Better UI for other drug names in dropdown
  * Merge pull request #172 from RyanNerd/170-medicine-drop-down-other
  * Display Other Drug Names in dropdown
  * 0.8.4
  * Merge pull request #171 from RyanNerd/code-clean-up
  * Code clean up
  * 0.8.3
  * Fixed About.tsx to allow using X to close
  * 0.8.2
  * removal of PopoverButton.tsx as it is unused
  * Add missing type declarations in reactn
  * Merge pull request #168 from RyanNerd/145-remove-apikeyobserver
  * Simplify the login authentication process
  * Simplify About modal
  * Merge pull request #167 from RyanNerd/163-fix-asyncwrapper-ts-errors
  * Fix :wrench: `asyncwrapper()` typing errors
  * Merge pull request #166 from RyanNerd/print-history-formatting
  * Print History Formatting
  * Merge pull request #165 from RyanNerd/more-ui-changes-pillboxlistgroup
  * Redesign UI :lipstick: PillboxListGroup
  * Merge pull request #164 from RyanNerd/pillbox-ui-change
  * Redesign UI :lipstick: PillboxListGroup
  * Suppress TypeScript errors that suddenly became a problem
  * 0.8.1
  * Removal of the unused MedicineDetails grid
  * Merge pull request #161 from RyanNerd/159-create-otclistgroupgrid
  * Create a grid specifically for OtcListGroup
  * Merge pull request #160 from RyanNerd/157-create-manageotcgrid
  * Create a grid specifically for ManageOtcPage
  * Merge pull request #158 from RyanNerd/147-add-search-manage-otc
  * Add Search :mag: Textbox to Manage Otc Tab
  * Merge pull request #156 from RyanNerd/154-refactor-druglog-grid
  * Refactor Drug History
  * Merge pull request #155 from RyanNerd/152-drug-history-rx-tab
  * Add History Radio Button to Rx tab - Factored out the meat of DrugHistoryPage into DrugHistory.tsx - DrugHistoryPage and MedicinePage use DrugHistory for display of drug log history and print - Added "(OTC)"" to the DrugLogGrid indicating an OTC drug log - Memoized DrugHistoryPage in the LandingPage to reduce re-renders
  * Merge pull request #153 from RyanNerd/149-remove-the-drug-log-table-from-manag
  * Remove Drug Log table from ManageDrugPage
  * Reorganization and Toast own component
  * Merge pull request #151 from RyanNerd/fix-checkout-drug-history
  * Show checkouts in drug log history
  * Merge pull request #150 from RyanNerd/performance
  * Performance :runner: enhancements
  * Performance :runner: enhancement
  * 0.8.0
  * Merge pull request #142 from RyanNerd/pillbox-full-feature
  * UX :bar_chart: Improvement
  * UI :lipstick: improvement
  * Toasts UI :lipstick: improved
  * Limit the DrugLogList to the last 5 days
  * Experimental hook for checking idle
  * - Improved the performance of the pillboxMedLog[] -
  * UI :lipstick: Improvements
  * PillboxListGroup takes children as a prop
  * Pillbox Display
  * PillboxListGroup.tsx changes
  * Code clean up
  * Removal of ClientObserver.ts
  * Removal of the PillboxObserver.ts
  * Removal of the PillboxItemObserver.ts
  * Removal of the DrugLogObserver.ts
  * Code clean up - Remove unneeded `e: React.MouseEvent<HTMLElement>` arguments in MedicineDetail.tsx and components that use it. - Moved the todo: add search box to Manage OTC from comment to an issue - Fixed a bug where even if cancel was chosen do delete an OTC drug the drug would get deleted anyway.
  * Print Medicine Checkout
  * - Change import for react-bootstrap to use direct imports for all components - When the OTC search textbox is cleared the `activeOtc` gets set to null. This was causing visual sync up issues. The search text would be set to an empty string but the selected drug would still be active.
  * Many changes
  * Make multiSort() generic
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * Refactoring
  * Fix :wrench: some UI :bug: bugs
  * More UI :lipstick: on MedicinePage
  * UI :lipstick: Changes
  * Fixing my brain fart
  * Fix :wrench: deleting a drugLog wasn't refreshing the `drugLogList`
  * removed lastTaken as a useState()/useEffect()
  * Removed `drugLogList` from MedicinePage
  * Merge remote-tracking branch 'origin/pillbox-full-feature' into pillbox-full-feature
  * Attempted a refactor of the async DrugLog
  * UI :lipstick: Change to log buttons
  * UI :lipstick: Change to log buttons
  * Significantly Simplified PillboxListGroup
  * Significantly Simplified PillboxListGroup
  * Refactored some pillbox log history functions
  * Partially fix "update" in the MedicineManager.ts
  * Attempt at getting Log Pillbox functionality
  * Show pillbox items in the med dropdown list
  * = Disable the Pillbox radiobutton if `medicineList` has less than 5 items
  * - OtcListGroup search textbox autoFocus - The MedicineDetail grid row will appear in bold if selected
  * Minor code clean up in MedicinePage.tsx
  * Simplified OtcListGroup
  * Flatten and sort all imports
  * - Fixed a missing useEffect dependency in MedicinePage.tsx - Flattened imports   - See: https://dev.to/nilanth/no-more-import-in-react-2mbo
  * Remove `activeClient` global
  * Manage activeMed state better when adding med
  * Keep state of activeMed when drugs are logged
  * :broom: Clean up code
  * Move all PillboxPage.tsx into PillboxListGroup.tsx - Moved the logic from PillboxPage as a landing page item instead making it a ListGroup item - Fixed a bug in `getPillboxItemS()` where the filter wasn't including the `pillboxId` - Removed the PillboxPage from the LandingPage - Added PillboxCard.tsx as a more feature rich PillboxItemGrid - MedicinePage.tsx updated to use PillboxListGroup new features and PillboxCard - PillboxItemGrid.tsx :building_construction:  scaffolding added for click on row functionality - PillboxListGroup.tsx placeholder replaced with actual logic and features :atom_symbol: - Destroyed :bomb: PillboxPage.tsx - Destroyed :bomb: MedicineListGroup.tsx
  * - Set initial state of `activeMed`, `activeOtc` & `activePillbox` by using `usePrevious()` hook. - Changed `LIST_TYPE` to `DISPLAY_TYPE` and added a Print to the enum. - Removal of the `<Collapse>` component in OtcListGroup.tsx - Conditional rendering fixed and updated in MedListGroup.tsx - LandingPage.tsx documentation updated
  * Moved state back down to components in LandingPage
  * Major :ringed_planet: :construction_worker: Overhaul of MedicinePage - MedicinePage can now be in one of three states:   1. Medicine - select and log prescriptions   2. OTC - Select and log OTC drugs   3. Pillbox - Select a pill box and log drugs therein - Complete UI :lipstick: redesign for MedicinePage.tsx - MedListGroup changed to **only** handle prescriptions (was handling pillbox and drugs -- needed separation of concerns) - Removed Show/Hide OTC buttons in OtcListGroup - Added PillboxListGroup.tsx - Added radio buttons Medicine, OTC, and Pillbox to let user set state. - OtcList global moved to LandingPage.tsx and passed into MedicinePage.tsx
  * - Minor code clean-up in About.tsx - ActiveResidentObserver.ts uses the `usePrevious()` hook now. - ApiKeyObserver.ts uses `asyncWrapper()` for better error control. - Minor code clean-up in ConfirmDialogModal.tsx - Very minor code clean-up in ErrorDetailsObserver.ts (removed a space) - Added function getPillboxItems.ts so MedicinePage.tsx and PillboxPage.tsx can share code. - Added `IPillboxItemObserver` interface to global.d.ts - Some code clean-up for LandingPage.tsx as well as some todos. Also `<PillboxPage>`` takes additional attributes passed in from LandingPage. - Minor code clean-up in MedDropdown.tsx - Added `<PillboxItemGrid>` to be displayed when the selected activeId is a pillbox. - Code clean-up for MedListGroup.tsx  - `<TooltipButton>` replaced with a standard `<Button>`  - Removed `tooltipText()` since it was displaying with the `<ToolTipButton>` anyway  - Added a + Log ALL Drugs in Pillbox button (not currently functional - PillboxItemGrid.tsx uses getPillboxItems.ts to build out the `PillRows. Some code clean-up. - Code clean-up in PillboxItemObserver.ts - PillboxPage.tsx   - Added props refresh for `pillboxItemList`, `pillboxList`, and `activePillbox`   - Use `getPillboxItems()` to fetch `PillboxItemRows` - Added a `usePrevious()` hook.
  * - Continued the overhaul of MedicinePage.tsx to use MedListGroup.tsx and support pillboxes. activeId is used instead of activeDrug. - Moved state from MedDropdown.tsx for the buildout of the listItems to MedListGroup.tsx. This solved a bunch of issues. - Removed the `medicineList` and `pillboxList` from MedDropdown.tsx replacing them with an `itemList` prop that comes from the MedListGroup.tsx solving a bunch of issues.
  * - Added `React.StrictMode` to all things ` <LandingPage>` :small_airplane: - Moving state up to the LandingPage.tsx for global lists. - Starting on the major revamp of MedicinePage.tsx so that it can support Pillboxes - MedListGroup.tsx created to replace MedicineListGroup.tsx - MedDropdown.tsx replaces MedicineDropdown.tsx - Minor :lipstick: cosmetic changes to PillboxEdit.tsx - Minor :lipstick: changes in PillboxPage.tsx
  * - :lipstick: Code Formatting
  * - :lipstick: UI formatting for the `TabPane` in PillboxPage.tsx   - The `Card.Title` now has a formatted pillbox name that looks similar to the selected `Nav` item.   - Added some text to help users know how to determine what is in the selected pillbox - Added Bootstrap color enumerator `BsColor` to common.ts - Both PillboxPage.tsx and PillboxItemGrid.tsx use `BsColor` enum
  * - Quantity selection in PillboxItemGrid.tsx is now a dropdown split button - Scaffolding set up for `onEdit()` handling in PillboxPage.tsx
  * - Significantly changed how PillboxItemGrid.tsx works by:    - sorting on Quantity, Drug    - Removed :boom: delete button    - Added small buttons of + qty    - All medicines for the client are displayed in the grid - PillboxPage.tsx changed to handle the new signature of PillboxItemGrid.tsx - Added _multiSort()_ function in common.ts to handle multiple column sorting.
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature - Got default pillbox and tab content to work via `active` attribute - Added a really important field to `PillboxItemRecord` (MedicineId was missing) - PillboxItemObserver.ts removal of `console.log()` diagnostic - PillboxItemGrid.tsx component added - Removal of unused imports in PillboxEdit.tsx - Moved state for PillboxPage up to the LandingPage.tsx
  * Update README.md and LICENSE.txt
  * Pillbox Feature
  * Pillbox Feature
  * 0.7.2
  * Merge pull request #141 from RyanNerd/manage-rx-row-size
  * UI :lipstick: fix :wrench: for ManageRx tab
  * 0.7.1
  * Fix a regression :bug: in MedicineEdit.tsx
  * Merge pull request #139 from RyanNerd/active-switch
  * 0.7.0
  * Medicine Active checkbox and Other drug names
  * 0.6.1
  * - When coping a the client name to the clipboard use the format FirstName LastName (was Lastname, FirstName) - Spelling fix in DiagnosticPage.tsx
  * Merge pull request #136 from RyanNerd/pillbox
  * 0.6.0
  * Search criteria signature change
  * Search criteria signature change
  * Dependency version & Diagnostics
  * Merge pull request #133 from RyanNerd/client-dropdown-minor-change
  * 0.5.1
  * Client dropdown addition
  * Version bump
  * Merge pull request #132 from RyanNerd/108-force-print-dialog-when-a-new-client
  * When adding new client show print dialog
  * Merge pull request #131 from RyanNerd/129-when-the-system-crashes-the-client-n
  * When ErrorDetails displayed unset ActiveResident
  * Fix a minor spelling error in code comments
  * Merge pull request #130 from RyanNerd/124-change-how-name-button-popover-works
  * Revamp the client name and DOB buttons
  * [WIP] Revamp the client name and DOB buttons
  * Merge pull request #128 from RyanNerd/121-notes-and-directions-for-packs-
  * For DrugHistory use a combo of Notes & Directions
  * Chage link text in About.tsx for issues - Closes #125
  * Updated the docblock for `clientFullName()` in common.ts
  * Merge pull request #127 from RyanNerd/nick-name
  * Nickname added to client / resident
  * Merge pull request #120 from RyanNerd/119-validate-client-dob-is-not-in-the-fu
  * Prevent DOB set in future
  * Merge pull request #118 from RyanNerd/112-medicineedit-fill-date-validation-
  * Prevent future Fill Date when editing Medicine
  * Merge pull request #117 from RyanNerd/109-change-isdayvalid-ismonthvalid-and-i
  * isYear, isDay, and isMonth Valid signature change
  * 0.4.5
  * npm run build exports memory limit before running
  * Small update to README.md
  * Merge pull request #116 from RyanNerd/115-clicking-on-client-dob-button-should
  * Launch edit modal for active client when DOB button clicked
  * Merge pull request #114 from RyanNerd/110-figure-out-why-the-medicineedit-moda
  * Fix 🔧 display issue with MedicineEdit.tsx
  * Merge pull request #113 from RyanNerd/tweak-fill-date-validation
  * Medicine Fill Date 📅 validation 👮
  * Merge pull request #111 from RyanNerd/fix-fill-date
  * Add Fill Date validation 👮
  * Merge pull request #107 from RyanNerd/quack-quack-die
  * Remove 🦆 typing from ManageDrugPage.tsx
  * Merge pull request #106 from RyanNerd/druglog-edit-validation
  * - Consolidated `getDrugName()` in common.ts - Code clean-up 🧹
  * [WIP] Don't show Out or In fields in DrugLogEdit if OTC
  * Removed a todo that was done
  * Merge pull request #101 from RyanNerd/spinner-observer
  * Add spinner to indcate when system is busy
  * Add spinner 🎡 to Medicine Dropdown when disabled
  * Merge pull request #100 from RyanNerd/observer-finally
  * Use `finally()` in observer promises
  * Delay before invoking print dialog for ClientRoster
  * LoginPage 👷 Rework
  * 0.4.4
  * Merge pull request #99 from RyanNerd/login-flair
  * LoginPage 👷 Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage 👷 Rework
  * Clean-up 🧹 code and documentation
  * Version Modal Additions
  * 0.4.3
  * Determine the version via npm env
  * 0.4.2
  * Merge pull request #98 from RyanNerd/revamp-otc
  * Revamp 💄 👷 OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp 👷 the OTC ListGroup
  * 0.4.1
  * Merge pull request #97 from RyanNerd/fix-dupe-client-issue
  * Fix  Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * 0.4.0
  * Merge pull request #96 from RyanNerd/client-notes
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * 0.3.18
  * Fix 🔧 + OTC and Edit OTC buttons from bleeding through
  * Merge pull request #95 from RyanNerd/version-update
  * Version updates in package.json
  * Add useStickyState hook for possible future use
  * More code changes to TooltipButton
  * Fix missing required attributes in TooltipButton
  * Get rid of the useless @constructor in JSDOC headers
  * Get rid of the useless @constructor JSDOC
  * Merge pull request #94 from RyanNerd/about-page
  * 0.3.17
  * Add About Modal
  * Merge pull request #93 from RyanNerd/client-name
  * 0.3.16
  * Client name and DOB headers are separate buttons
  * Merge pull request #92 from RyanNerd/fix-client-name-update
  * 0.3.15
  * Fix 🔧 ActiveResident global not getting updated when client info updated
  * Merge pull request #91 from RyanNerd/client-printout
  * 0.3.14
  * Add Feature to Print Client Roster
  * 0.3.13
  * Merge pull request #90 from RyanNerd/client-roster
  * Add Feature to Print Client Roster
  * Merge pull request #89 from RyanNerd/fix-drug-log-edit
  * 0.3.12
  * 🔧 Fixed DrugLogEdit
  * Merge pull request #88 from RyanNerd/bulk-med-checkout
  * 🔧 Fixed Print Medicine Checkout in Manage Rx tab
  * Merge pull request #87 from RyanNerd/bulk-med-checkout
  * 0.3.11
  * Log Drug from Manage Rx tab
  * 💄Log Drug from Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * Date.toLocaleString() TS fix
  * Merge pull request #86 from RyanNerd/otc-in-rx-page
  * 0.3.10
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and medical logging
  * Merge pull request #82 from RyanNerd/show-client-print
  * Add client name and DOB to DrugHistoryPage print area
  * 0.3.9
  * Merge pull request #81 from RyanNerd/get-version-from-package.json
  * Use package.json to obtain version
  * Merge pull request #80 from RyanNerd/fix-print-margins
  * Fix print margins
  * Merge pull request #79 from RyanNerd/fix-drug-history-print
  * Allow the printing of the client name in DrugHistoryPage
  * Bumped up RxChart version in package.json
  * Added Out and In columns to MedicinePage drug log grid
  * Merge pull request #78 from RyanNerd/no-print
  * Print MedicineCheckout Enhancements and 🔧 Fixes
  * Merge pull request #77 from RyanNerd/dependancy-version-update
  * Upgrade ⬆ dependency versions
  * Merge pull request #76 from RyanNerd/disable-login-field-empty
  * Disable Login button if password or username are empty 🗑
  * Merge pull request #75 from RyanNerd/base-url-error-message
  * Display error message if .env is missing or BASEURL isn't set
  * Bumped the version in package.json
  * 💊 Medicine Checkout Feature
  * Merge pull request #74 from RyanNerd/medicine-checkout-feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💥 Remove `<any>` type
  * ♻ Refactor Validation 👮 code into its own 📁
  * 🔧 Fix `drawBarcode()` to verify the canvas element exists before trying to draw the barcode
  * 💊 OtcPage.tsx
  * 💊 MedicinePage
  * 💊 MedicinePage
  * 💊 MedicinePage 🐛 fix
  * 🔨 Fix pressing enter in search textbox causes app to reset.
  * 🔧 Fix NPM dependency ➕
  * Revert tsconfig.json
  * tsconfig.json is pitching a 😠 fit
  * Removed the development 🙈 requirement for the DiagnosticPage.tsx
  * Merge pull request #73 from RyanNerd/disable-log-buttons
  * 🎇 Added disable feature to the log buttons
  * ⬆ Upgraded dependencies
  * 0.3.5
  * 0.3.4
  * Merge pull request #72 from RyanNerd/fix-scroll-to-modal
  * Removed scrollTop feature from all tab pages
  * Merge pull request #71 from RyanNerd/prevent-client-dupe
  * ResidentManager fixed 🔧 to prevent dupes
  * ♻ setApi() changed to emit a promise - Loading of client records, OTC records now only happens AFTER the apiKey is set for ALL providers. - Discourse on the Observer middleware architecture is exhastively commented in App.tsx
  * Consolidation 🧑‍🤝‍🧑 of the AuthObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the OtcMedicineObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the DrugLogObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the MedicineObserver 🔭
  * Merge pull request #70 from RyanNerd/observer-consolidation-client
  * Consolidation 🧑‍🤝‍🧑 of the ClientObserver 🔭
  * Added `logout` as a global 🌎 hook 🎣
  * 💄UI Improvements in MedicinePage
  * :boom: removed `console.log()` from UpdateClientObserver.ts
  * ♻ When a new client is added make that client active
  * 💥 Removal of Search box from MedicinePage
  * Merge pull request #69 from RyanNerd/code-reformatting
  * - 💄Code formatting for multiple modules
  * - 💄JSDoc  and code formatting changes
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * Merge pull request #67 from RyanNerd/otcpage-using-table
  * 💄 UI for OtcPage changed to list 📜 OTC drugs in a table
  * Fix 🔧 a minor linting problem
  * Add Search 🔍 Validation
  * ♻ Refactored <LogButtons> into its own component
  * Added Log button stack to the ListGroup
  * 🚘 In progress - OtcPage using table instead of MedicineListGroup
  * 💄 Changed Tab order in LandingPage.tsx
  * Merge pull request #66 from RyanNerd/hooks-4-updates
  * OtcPage now uses declarative hooks 🎣 for updates and delete processing
  * 💄A little bit of code clean-up 🧹
  * A couple of hooks 🎣 added for OTC
  * 💄Code formatting and adding better comment 💬 headers
  * ♻ Refactoring
  * `login` is now a global 🌎 hook 🎣 that is set to the `{username, password}` when a user logs in.
  * `refreshOtc` is now a hook 🎣 trigger 🔫 for when the otcList needs to be refreshed.
  * - `deleteMedicine` is now a hook 🎣 trigger 🔫 for when a MedicineRecord is to be deleted. - 💄Reorganized the code in App.tsx
  * - `deleteDrugLog` is now a hook 🎣 trigger 🔫 for when a DrugLogRecord is to be deleted. - Fixed a 🐛 in the DiagnosticPage where `CloseErrorButton` wasn't inside the `useMemo()` - Changed MedicineManger, MedicinePage, and OtcPage with how it handles deletes in prep for the next salvo of changes.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Merge remote-tracking branch 'origin/hooks-4-updates' into hooks-4-updates
  * 🎣 App.tsx is the single source of truth via hooks 🔧 Fixed a problem when the medicine dropdown changes the selection would revert back to the original value.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 💄Code format changes
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Add ShadowBox 🔲 to Directions in MedicineListGroup - Just for flare's 🌈 sake
  * Merge pull request #65 from RyanNerd/toggle-switch
  * Merge pull request #64 from RyanNerd/shadow-box
  * Add ShadowBox 🔲
  * Add ToggleSwitch 💡
  * 🔧 Fixed the double underline for the medicine link ⛓
  * 💄Add link ⛓ on MedicinePage for drugs 💊 - Added some flair 🌈 to the link via CSS - Link uses [GoodRx](https://goodrx.com)
  * Merge pull request #63 from RyanNerd/react-upgrade-workaround
  * 🔧 Work-around a 🐛 with ⚛ React 17 and DropdownButton - See: https://github.com/react-bootstrap/react-bootstrap/issues/5409 - The work around is here: https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584 - package.json was changed to bring in React ⚛ v17.0.1
  * Add support for Willow 🌳 API error handling - ♻ Refactored DiagnosticPage by adding <CloseErrorButton> reusable component - 🌳 Willow API error parsing added to DiagnosticPage.tsx
  * ♻ Refactoring to import using reactn when possible
  * Merge pull request #62 from RyanNerd/error-state-logout
  * Disable Login page when there is an error
  * 🥅 DiagnosticPage now resets correctly when dismissed - Changed order of operations with LoginPage when testing errors. - Changed LandingPage handling `dismissErrorAlert()` to set global state back to initial values.
  * 🎨 Change activeTabKey state to be string only
  * 💄Added Log 3 & log 4 buttons - Buttons added to MedicineListGroup, MedicinePage, and OtcPage - Added scroll to top for all pages when that page becomes active (except for the LandingPage as that page is always active whem the app starts)
  * Add 📜 Scroll-to-top logic in the ResidentPage when it becomes active
  * 💄When a resident is selected reset the search textbox to an empty string. After a resident is selected when the user returns to the ResidentPage tab typically they are looking to select a different resident or add one and reseting the search textbox to empty string shows the entire resident list.
  * 💄More code formatting in ResidentPage
  * 💄Code formatting 🔨 fix in ResidentPage
  * Merge pull request #61 from RyanNerd/resident-search
  * Add a search 🔍 filter to ResidentPage
  * 🐟 Upstream merge from master
  * 💄Make the Medicine tab title Rx
  * Add search 🔎 to ResidentPage
  * 💄Make all modals backdrop = ⚡static⚡ Modals can no longer be dismissed by clicking off the modal.
  * Added missing `ResidentId` to DrugLogRecord
  * 💄 ResidentGrid now shows Created and Activated columns as formatted dates
  * 📜 Scroll to the top of the page when MedicinePage is active
  * 🔥Removal of no-namespace rule in tslint.json The previous merge allows this rule to be reestablished as the default
  * Merge pull request #60 from RyanNerd/bwip-js-update
  * 🔥Removal of bwip-js.d.js the 👽📦 updated
  * :rotating_light: Added `tslint-react-hooks` to the linter
  * ♻ Refactored ✈LandingPage and  ⚕DrugHistoryPage ⚕DrugHistoryPage now uses globals instead of props Single responsiblity.
  * ✈ LandingPage uses CSS to bold active tabs This used to be done via a function.
  * 💄Cosmetic changes to LandingPage
  * Merge pull request #59 from RyanNerd/active-tab-key
  * ⚡ Improve performance by only rendering tab content when that tab is active Added the prop `activeTabKey` to a number of Pages and put conditional logic in place to prevent render when that tab isn't the active tab.
  * Minor code format 🔨 fix
  * ♻ Refactor MedicinePage, OtcPage, and DrugLogGrid - Make `getObjectByProperty()` generic - Move `getDrugName()` to common.ts for refactoring.
  * 💡Updated DocBlocks to be more concise Also removed 🔥 unneeded `: void` return types
  * Minor change when adding new resident auto switch to Rx tab
  * Changed `calculateLastTaken` to use Created date instead of Updated.
  * Merge pull request #58 from RyanNerd/api-set-change
  * 🔧 Fixed a problem with the DropDown button The dropdown button would stop working after a modal was opened. After a 🌦 day of pulling my 🦱 out trying to figure out what had happened. Finally found this: https://github.com/react-bootstrap/react-bootstrap/issues/5409 Had to thunk React back down to 16.14.0
  * Changed how APIs get set in the providers
  * Merge pull request #57 from RyanNerd/external-package-upgrades
  * Updated several 📦 packages to the latest version bootstrap.min.css was removed 🔥 from the public folder and the stylesheet link in index.html was also removed index.tsx now imports bootstrap.min.css using the NPM package The following 📦 packages were upgraded: - React ⚛ - bootstrap 💄 - bwup-js - typescript 📜 One package was removed: - react-new-window
  * Merge pull request #56 from RyanNerd/frak-upgrade
  * Update Frak to latest version and 🔧 fix Providers - 👽 Frak package is no longer an object but is now a function. All providers changed accordingly. - Error 🐛 handling was updated in DiagnosticPage since Frak no longer emits a custom error, but ⚾ throws the Response as an error when there is an exception.
  * Merge pull request #55 from RyanNerd/gotta-catch-em-all
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Automatically activate ⚡ the Rx (medicine) when a resident is selected
  * Added a dismiss 🔥 option for `_alert()` allowing users to log back in. Also 🚛 moved `_alert()` into `useMemo()`
  * Add 📃 JSDoc blocks to DiagnosticPage.tsx Also added some additional 🦆 type checking logic
  * Merge pull request #54 from RyanNerd/diagnostics-retool
  * Retooling 🔧 of DiagnosticPage.tsx
  * Merge pull request #53 from RyanNerd/global-error-handling
  * :bug: Error handling is now done via a 🌎 global called `errorDetail` All components in the Page directory no loger call `onError()` but instead now use `errorDetails()` Moved the observer that hides the Diagnostic tab to the DiagnosticPage.tsx 💄Improved the code in DiagnosticPage.tsx to better display errors depending on the type of error. The error prop that DiagnosticPage.tsx receives is of the type `any` so some 🦆 typing logic was added. global.d.ts and getInitialState.ts were 🔝 updated to handle the new global `errorDetail` TODO: Make the DiagnosticPage.tsx use an accordion component when showing details. This will be a future task.
  * ✨ Added code in LandingPage to more cleanly set the tab titles and bold the tab that is active.
  * Merge pull request #52 from RyanNerd/auth-manager
  * ♻ Refactor Providers and establish AuthManager 🗑 Removed ProviderTypes.ts moving the type definitions to the individual providers ✨ Created AuthManager to be consistant with design
  * ResidentPage code clean-up 💄 🗑 Removed `refreshDrugs()` since it was only being called from one place and refactored ♻ the code into the orginal caller.
  * 🔧 Fix ResidentPage which had a recursive 🐛 🗑 Removed the `useEffect()` and replaced it with `refreshDrugs()` upon edit/add/select/delete operations
  * ♻ Refactored all the .tsx files in the Pages directory to the components directory
  * Merge pull request #51 from RyanNerd/autoload-lists
  * Handle resident changes via useEffect to reload 🔃 residentList, medicineList, and drugLogLists ♻ Refactored ResidentManager eliminating 🗑 the complexity
  * Merge pull request #50 from RyanNerd/medicine-manager
  * ♻ Refactored ManageDrugPage, ManageOtcPage, and OtcPage to use the :sparkles: new MedicineManager.ts
  * ♻ Refactored MedicinePage to use :sparkles: new MedicineManager.ts
  * Merge pull request #49 from RyanNerd/current-resident
  * 💄Cosmetic code changes and made providers more logical ♻ Refactored the Providers to take baseUrl as an argument 🗑 Removed baseUrl from the globals
  * ✨ Major ♻ refactoring for Resident bussiness logic  Moved all business logic to a ResidentManager module.
  * More 🚲 Bikeshedding cosmetic 💄 code changes to multiple modules
  * 🚲 Bikeshedding some 💄 cosmetic code changes to MedicineListGroup
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to ResidentGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to MedicineDetail
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to DrugLogGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to TooltipButton
  * :sparkler: Added AuthenticationProvider
  * :rocket: Major revision to providers making them type safe :closed_lock_with_key:
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to OtcPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to ManageOtcPage
  * :lipstick: Cosmetic code changes to MedicinePage
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to ResidentPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: cosmetic code changes  uses global State as an interface
  * :lipstick: cosmetic code changes in
  * :lipstick: cosmetic code changes defaulting to empty arrays for lists instead of null
  * :scroll: Typing and :lipstick: cosmetic code changes to DrugLogGrid and DrugHistoryPage
  * :lipstick: Cosmetic code changes including an .editorconfig file to enforce style
  * More :lipstick: Cosmetic changes to the code (indentation and other)
  * :lipstick: Cosmetic changes to the code (indentation and others)
  * :sunglasses: Simplfy the providers even more
  * Further reduce the warning noise :loud_sound: in the console log by :wrench: fixing the show prop to be bool
  * Eliminate the warning noise :loud_sound: in the console log by changing onAnswer to onSelect
  * :sunglasses: Simplify all providers to use Frak directly
  * Merge pull request #48 from RyanNerd/frak-npm
  * Use Frak from the NPM :package:
  * :arrow_heading_up: Update React to 16.14.0 and add lint rules for code line length and :wrench: fix modules that violated the new rule.
  * Added tslinter :heavy_check_mark: and updated all code
  * :wrench: Fix code indentation in ResidentGrid
  * :wrench: Fix code indentation in MedicineDetail
  * :sunglasses: Simplify DrugLogGrid
  * :tractor: Moved  into  and some :scroll: typing changes
  * :scroll: Type code changes in common
  * :sunny: Clean up code for the  function
  * tractor: Moved  to common
  * useForceUpdate deleted :wastebasket: as it was not being used. :scroll: Types extended for TooltipButton
  * :wrench: Fix :scroll: typings in MedicineListGroup for logDrug callback
  * :wrench: Fix :scroll: typings in MedicineListGroup for barcode canvas
  * :wrench: Fix :scroll: typings in MedicineListGroup and OtcPage
  * :wrench: Fix the typings in DrugDropdown and MedicineListGroup
  * :lipstick: Make IProps interface definiton more specific in ResidentGrid
  * :lipstick: Center text for Selected column in ResidentGrid
  * :lipstick: Add Reload button in ResidentPage and :wrench: tighten up code
  * :wrench: Fix ResidentPage to use TooltipButton
  * :lipstick: Remove condenced class from the Resident table
  * Code format :lipstick: changes in Frak
  * :sunglasses: Simplify LastTakenButton
  * :lipstick Don't display the LastTakenButton if the lastTaken value is null
  * :wrench: Fix the display :lipstick: of Last Taken (hours)
  * :wrench: Fixed :lipstick: formatting in DrugLogGrid for Drug and Created rows
  * :sunglasses: Simplify bolding in ResidentGrid and DrugLogGrid
  * :lipstick: Made selected resident row bold. :wrench: fixed the drug log grid to show in bold when drug logged today
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :star2: Add missing Doc-Blocks and :wrench: fix a bug in ResidentPage where medicine logs weren't loading
  * :lipstick: Cosmetic changes to Fill Date display
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in MedicinePage
  * :wrench: Fixed error handling in MedHistoryProvider
  * :wrench: Fixed error handling in MedicineProvider
  * :wrench: Fixed error handling in ResidentProvider
  * :wrench: Error handling and added DiagnosticPage to display errors
  * :twisted_rightwards_arrows: Refactor ResidentPage and fix a :bug: in ResidentProvider
  * :wrench: Tightened up code in ResidentPage
  * :lipstick: Make mouse cursor default when the Log 1 / Log 2 buttons are disabled
  * :eight_spoked_asterisk: More changes to the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :eight_spoked_asterisk: Change the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :arrow_heading_up: Upgraded bootstrap.min.css to latest version 4.4.1
  * :rainbow: Changed the color scheme of the DrugLogGrid based on lastTaken
  * :sunglasses: Simplify the LastTakeButton (remove unused props)
  * :cyclone: Major code clean-up
  * :twisted_rightwards_arrows: Refactor DrugLogGrid to use getObjectByProperty()
  * :lipstick: Show drug name in Delete confirmation dialog for OtcPage and MedicinePage
  * :twisted_rightwards_arrows: Refactor deleteDrugLog
  * :sunglasses: Make MedicineDetail a component with props
  * :sunglasses: Make DrugLogGrid more generic
  * :fire: Remove RxTable and use the Table component instead for simplicity :sunglasses:
  * :sunglasses: Make the MedicineDetail more generic
  * :lipstick: Costmetic change make last taken variant color consistant
  * :twisted_rightwards_arrows: More ResidentPage simplification
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :lipstick: Cosmetic change for Delete confirm in ManageOtcPage
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * Fix a :bug: in Confirm and have ManageDrugPage use the new component
  * Create Confirm in the Modals directory as a better more generic ConfirmationDialog
  * Make the ConfirmationDialog more generic :older_man:
  * Add a more prominant warning :warning: when an OTC drug will be deleted
  * Merge pull request #47 from RyanNerd/react-bootstrap-typescript
  * Cosmetic :lipstick: changes to all the tab titles making them bold when active
  * Minor cosmetic :lipstick: code changes
  * :twisted_rightwards_arrows: For consistancy refactor getResidentList
  * :twisted_rightwards_arrows: Refactor remaining refreshList into getLists
  * :twisted_rightwards_arrows: Refactor RefreshMedicineList into getMedicineList
  * Added a :warning: when OTC meds are edited that the change will be for all
  * :twisted_rightwards_arrows: Refactor of ManageOtc, ManageRx, OtcPage, and MedicinePage
  * :beginner: Simplify addEditDrugLog in Medicine and Otc Pages
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage for logging drugs
  * Refactoring of page to Pages
  * :bowtie: Add Log 2 button to MedicineListGroup & fixed a :bug: in OtcPage
  * :bowtie: change layout of OtcPage to better accomidate the drug history grid
  * fix a :bug: with the error handler. Also hide the Diagnostics tab completely when not active
  * :part_alternation_mark: Change how field setFocus works
  * :scroll: TypeScript conversion even more typings and fix an OTC delete bug
  * :scroll: TypeScript conversion even more typings
  * :scroll: TypeScript conversion ResidentProvider typings
  * :scroll: TypeScript conversion ResidentPage fix :bug: DrugLog refresh
  * :scroll: TypeScript conversion ResidentPage typings
  * :scroll: TypeScript conversion More MedicineProvider typings
  * :scroll: TypeScript conversion MedicineProvider typings
  * :scroll: TypeScript clean-up of Frak and elimination of FrakTypes
  * :scroll: Major TypeScript / object conversion for Frak
  * :scroll: TypeScript / object conversion for Frak
  * :scroll: TypeScript conversion Frak
  * :scroll: TypeScript conversion add useProviders() hook
  * :scroll: TypeScript conversion tighten up more code
  * :scroll: TypeScript conversion tighten up code
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for MedicinePage
  * :scroll: TypeScript conversion for ManageOtcPage
  * :scroll: TypeScript conversion for ManageDrugPage
  * :scroll: TypeScript conversion for LoginPage
  * :scroll: TypeScript conversion for RefreshMedicineLog
  * :twisted_rightwards_arrows: Refactor of Provider helpers
  * :scroll: TypeScript conversion for RefreshOtcList
  * :scroll: TypeScript conversion for DeleteMedicine
  * :scroll: TypeScript conversion for RefreshMedicineList
  * :scroll: TypeScript conversion for ResidentProvider
  * :scroll: TypeScript conversion for MedicineProvider
  * :scroll: TypeScript conversion for DrugHistoryPage
  * :scroll: TypeScript conversion for ResidentEdit
  * :scroll: TypeScript conversion for MedicineEdit
  * :scroll: TypeScript conversion :bug: fix for DrugLogEdit
  * :scroll: TypeScript conversion for DrugLogEdit
  * :scroll: TypeScript conversion Fix :wrench: up for ConfirmationDialog
  * :scroll: TypeScript conversion Remove InformationDialog
  * :scroll: TypeScript conversion ConfirmationDialog
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion DrugDropdown
  * :scroll: TypeScript conversion MedicineDetail
  * :scroll: TypeScript conversion DrugLogGrid
  * :scroll: TypeScript conversion ResidentGrid
  * :scroll: TypeScript conversion RxTable
  * :scroll: TypeScript conversion LastTakenButton
  * :scroll: TypeScript conversion for React Bootstrap
  * :curly_loop: Yet even more TypeScript conversions
  * :curly_loop: Even more TypeScript conversions
  * :curly_loop: More TypeScript conversions
  * :curly_loop: Minor TypeScript conversions
  * Merge pull request #46 from RyanNerd/medicine-otc-page-refactor
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage
  * Merge pull request #45 from RyanNerd/otc-feature
  * :lipstick: Even more cosmetic changes & fix to attribute={true} making React mad
  * :lipstick: More cosmetic changes and a subclass of Table
  * :twisted_rightwards_arrows: Refactored LastTakenButton and some cosmetic changes
  * :fountain: Add Log 1 and Log 2 amounts button feature
  * :lipstick: Cosmetic changes
  * :wrench: fixed a minor type :bug: in MedicinePage and OtcPage
  * :zap: Fixed barcode issues and a :bug: in TooltipButton
  * :sunglasses: Fixed the problem with barcodes not showing up correctly
  * :twisted_rightwards_arrows: Convert index.js to index.tsx
  * :star: Change wording in ResidentPage when deleting to 'deactivate'
  * :white_circle: Clean up code in InitialState.tsx
  * Add and fix docblocks
  * :carousel_horse: Work-around for React null handling stupidity
  * :wrench: fixed code in common.js and converted it to common.tsx
  * Tighten up code in MedicineListGroup
  * bwip-js version bump and minor fix to MedicineListGroup
  * Code formatting fixes
  * Tighten up obserer effects in the modals
  * Disable the Save button if the Drug name is empty in the MedicineEdit modal
  * Disable the Save button if Notes are empty in the DrugLogEdit modal
  * Set focus to first name field in the ResidentEdit modal when it is shown
  * Add support for barcodes in search input box
  * Fix OTC Search is valid icon indicator
  * Fix layout problems when there were no medications
  * Tighten some code in MedicinePage
  * Search validation icon logic clean-up
  * Tighten the search useEffect code
  * Handle search matches via useEffect
  * Add docblock to handleMedicineEditModalClose() helper function
  * Refactoring of ManageOtc and ManageDrug pages
  * If enter is pressed on the password textbox then login
  * Add search feature
  * Made sure all MouseEvents had an e.preventDefault()
  * Add PropTypes to remaining components
  * Added PropTypes checking to all pages
  * Convert all functions to arrow functions
  * Fixed an annoying bug where when adding a new resident the medlist wasn't getting cleared
  * Cosmetic fixes and textbox focus feature added
  * Add Manage OTC Page
  * Tightened up some code in MedicinePage and OtcPage
  * A bit of refactoring
  * created a generic TooltipButton replacing the specific AddMedicine button. Also fixed a bug in DrugLogGrid header
  * Removed leftover barcode handling from OtcPage/MedicinePage
  * OtcPage now displays all OTC meds taken in the history
  * Remove setGlobal and use hooks directly instead
  * Convert functions to const
  * Fix problem with OTC meds not showing drug name in DrugHistoryPage
  * Fixed and optimized drugLogList refresh
  * Tweaking things to support OTC -- almost there
  * Removed query and replaced it with search
  * Tightening up code
  * Move Frak() out of the global space
  * remove corrupted InitalState.tsx.sav
  * Save progress
  * Support for OTC
  * Shrink MedicineListGroup in prep for OTC feature.
  * Add DOB to active resident
  * npm package audit fix
  * Fix error when a barcode has no value
  * Merge pull request #43 from RyanNerd/fix-restore-resident
  * Fix medicine log/list not appearing when a resident is restored
  * Merge pull request #42 from RyanNerd/fix-drug-history
  * :bug: Fix drug name not updating on history when edited
  * Merge pull request #41 from RyanNerd/bootstrap-local
  * :sparkles: Make bootstrap.min.css local instead of using a CDN
  * Merge pull request #40 from RyanNerd/organization
  * :sparkles: Organization name now shows when logged in
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * Merge pull request #39 from RyanNerd/embed-barcode-renderer
  * :lock: No longer use the barcode API
  * :lock: Make barcode API call use HTTPS
  * Merge pull request #37 from RyanNerd/typescript-continued-1
  * :art: Merged fix from master that fixes TS errors
  * :art: Fixed the problem with App.tsx throwing TS errors
  * Merge pull request #36 from RyanNerd/resident-color-prod-dev
  * :children_crossing: Resident color changes depending on prod/dev
  * :pencil2: Minor fix to index.js
  * Merge pull request #33 from RyanNerd/fix-delete-med-web-issue-8
  * :bug: Fixed issue where the edit medicine modal would show when deleting a medicine
  * Merge pull request #32 from RyanNerd/fix-refresh-med-list
  * :bug: Remove unneeded and buggy code from RefreshMedicineList
  * :bug: Fix RefreshMedicineList
  * Continued TypeScript conversion
  * Merge pull request #31 from RyanNerd/typescript
  * :art: Start on the path of using TypeScript
  * :package: Updated to use the latest create-react-app
  * :package: Add support for TypeScript
  * Merge pull request #30 from RyanNerd/med-alert
  * :sparkles: Alert message for last time med was taken
  * :art: Fix DocBlocks and remove an unneeded CSS file
  * Update README.md
  * Work-around for weird bug in projection for deleting medicine
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for Deleting a medicine
  * BUGFIX: When adding new resident the medicineList and activeMedicine are cleared
  * RefreshMedicineList now uses search() instead of query() so order_by can be used.
  * Refresh of drug history/log for unTrashed residents and a fix for delete dialog only working once.
  * Added logic to restore inactive residents
  * Merge pull request #25 from RyanNerd/remove-delete-medicine-scan-tab
  * Removed the Delete Medicine button on the MedicinePage
  * Merge pull request #22 from RyanNerd/manage-medicine-barcode
  * Remove subdomain from authentication request
  * Merge pull request #16 from RyanNerd/bacode-refresh
  * Refresh barcode image if the barcode changes
  * Merge pull request #15 from RyanNerd/new-resident-become-active
  * If an existing resident is edited/changed or added make that the ActiveResident
  * Clear barcode when barcode not recognized (after an add or if add is cancelled)
  * Resident DOB for Nov(11) not allowing anything more than 28
  * Add blank EOL to ResidentEdit
  * ResidentGrid columns have LastName FirstName now
  * Fix date verification code
  * Merge remote-tracking branch 'origin/master'
  * Fixed bug when deleting medicine would crash
  * Git ignore the lock files so we don't need to deal with them in production.
  * Added some valdation to ResidentEdit
  * Moved TODO items as issues in Github.
  * Split MediciineListGroup as it's own component to simplify MedicinePage
  * Fixed barcode update issue
  * Added FillDate fields to the MedicineEdit
  * Added barcode and fixed error when no residents exist.
  * Allow deleting medicine
  * Fixed adding new medicine from ManageDrug page
  * Prepped ResidentPage for 'Show Deleted'
  * Fixed a bug when medicine was added on the fly when a barcode is not found
  * Rearranged Medicine edit and delete buttons on Medicine page
  * Removed Chrome Requirement
  * Refactored AddNewMedicineButton into its own component
  * ManageDrugs proof of concept
  * DrugLogGrid layout style changes
  * DrugHistoryPage
  * DrugHistory proof of concept completed
  * Fixed a cosmetic issue in DrugLogGrid as well as updated Reactn in `package.json`
  * MedicineLog now contains ALL history for ALL drugs and is filtered in DrugLogGrid
  * Save progress (proof of concept for window popup)
  * More error handling
  * onError handling via catch() in MedicinePage
  * onError handling
  * Changed text color to blue for Dialog box when a barcode not found
  * Dialog box when a barcode not found
  * DocBlocks for MedicinePage
  * Added delete drug log record feature and fixed a problem when cancelling delete drug.
  * Fixed problem with drug log not updating properly when a new drug was added.
  * Added browserInfo function and moved InitialState.js into the utility directory
  * favicon
  * Use .env to indicate API base url and if development
  * Remove useless code from Frak
  * Small update to the README
  * Update README.md with a better description of this project.
  * ProviderBase preliminary code
  * Document Providers
  * Added logic to delete a Resident
  * Removed the forced uppercase
  * Made drugLogList a global
  * When a resident is selected from the resident list and they have medicine the first one in the list will become the activeDrug
  * Logging of Drugs Modal and POST logic added.
  * Logging of Drugs almost complete
  * Delete functionality, ConfirmationDialog, and InformationDialog components
  * Even more Additional MedicinePage layout changes
  * Additional MedicinePage layout changes
  * MedicinePage layout changes
  * Fix security issue with lodash
  * Preliminary work to get MedicineEdit modal up and running.
  * Some clean up in index.js and index.html
  * Save modal update/save changes.
  * Save modal edit changes.
  * Fix security vulnerability in lodash.
  * Merge pull request #1 from RyanNerd/remove-barcode-as-a-bound-global
  * Make barcode value NOT a global
  * Make barcode value NOT a global
  * Some Refactoring and bug fixes
  * ResidentPage use setGlobal instead of useGlobal for setting state only.
  * Add documentation to LoginPage \ MedicinePage
  * Add documentation to LoginPage \ MedicinePage
  * Fix Linting warnings
  * MedicinePage get barcode and dropdown working again.
  * MedicinePage refactoring
  * LoginPage cosmetic changes
  * Conditional logic for display of drug card
  * Moved quite a bit of logic to MedicinePage
  * Proof of concept for MedicinePage
  * Added Delete (layout only) for Resident List
  * Refactored the Resident Table into it's own component ResidentGrid
  * ResidentEdit modal added
  * Additional features added
  * Build out ScanPage a bit more
  * Save Progress
  * Save Progress
  * ResidentList global populated at login without error this time
  * ResidentList global populated at login
  * Save progress
  * Save progress
  * Save progress
  * Save progress
  * remove .babelrc
  * Initial commit from Create React App
  * Merge pull request #257 from RyanNerd/254-recfactor-adddruglog-functions
  * ♻ refactor `addEditOtcLog()` into `AddEditDrugLog()` in MedicinePage
  * Merge pull request #256 from RyanNerd/refactor-handleLogOtcAmount-to-logamount
  * ♻ refactor `handleLogOtcDrugAmount() has been refactored int `handleLogDrugAmount() in MedicinePage
  * ♻ refactor `setLastTaken()` in MedicinePage is now declarative
  * ♻ refactor Remove unneded type guards
  * Merge pull request #253 from RyanNerd/244-set-the-activemed-item-build
  * ♻ refactor setActiveMed when the med dropdown list is created
  * 👗 style Change a variable from `n` to `medicineId` in DeleteMedicineModal
  * Merge pull request #251 from RyanNerd/249-medicinepage-refactor-delete-druglog
  * ♻ refactor DeleteDrugLogModal as a separate component in MedicinePage
  * 👗 style Renamed the Changelog Commit Guide
  * Merge pull request #250 from RyanNerd/245-medicine-page-code-improvement
  * 👗 style Props and arguments are more declarative
  * Merge pull request #248 from RyanNerd/246-ok-as-confirm
  * 👗 style Change  `a` to `isAccepted` for Confirm results
  * Merge pull request #247 from RyanNerd/243-checkout-grid-del-otc
  * 👗 style Remove OTC from CheckoutGrid.tsx
  * 👗 style Clean up code for Pages
  * 👗 style Code clean up Toasts
  * 👗 style Code clean up for Modals
  * 👗 style Code clean up for ListGroups
  * 👗 style Code Simplification for many components
  * 0.10.6
  * 🐛 bug Fix LastTakenButton not showing when hours taken === 0
  * 👗 style Code formatting changes
  * 📓 docs Created a Conventional Commit Guide to standardize commit messages and types
  * Merge pull request #242 from RyanNerd/changelog-create
  * Added 📄 CHANGELOG.md 📄 file
  * 0.10.5
  * Code Cleanup :broom:
  * Improve Client Selection Performance :bullettrain_side:
  * 0.10.4
  * Merge pull request #241 from RyanNerd/239-otc-delete
  * Allow OTC medicine to be deleted :bomb:
  * 0.10.3
  * Merge pull request #238 from RyanNerd/237-modal-improvements
  * Modal Improvements
  * Code Improvements for MedicineEdit
  * 0.10.2
  * Refactored the Checkout All Meds confirm modal
  * 0.10.1
  * Fix :wrench: inactive meds showing up in dropdown
  * 0.10.0
  * Merge pull request #235 from RyanNerd/198-soft-delete-medicine
  * Allow Medication to be Deleted :bomb:
  * Change tsconfig.json to not include comments :notebook: in the output
  * Code Clean Up :broom: `` - Use ` `${variable}` ` instead of string concatination - Moved TooltipContainer.tsx to a Container directory under Pages
  * Fix :wrench: problems found with inspections
  * MedicineDrugPage UI Improvement :lipstick:
  * MedicineEdit UI Improvements :lipstick:
  * UI :lipstick: Improvements for `<Confirm.Modal>`
  * Change how the search text is ClientPage is handled
  * 0.9.8
  * 0.9.7
  * ResidentGrid => ClientGrid Name change
  * Fix :wrench: Med Labels from Client dropdown printing all clients
  * 0.9.6
  * Merge pull request #234 from RyanNerd/224-inactive-meds-in-pillbox-item-grid
  * Fix :wrench: PillboxItemGrid showing inactive meds
  * Merge pull request #233 from RyanNerd/231-deconstruct-props-manage-drug-page
  * ManageDrugPage Improvements :sparkle:
  * 0.9.5
  * Confirm component Enhancement :sparkler:
  * 0.9.4
  * Merge pull request #232 from RyanNerd/227-conslidate-confirms
  * Consolidation of confirm modals
  * 0.9.3
  * Merge pull request #226 from RyanNerd/225-active-field-otc
  * UI change for Manage Rx and Manage OTC
  * Merge pull request #221 from RyanNerd/216-client-object
  * Get confirmation for checkout all if there are exiting checked out meds
  * MedicineEdit Improvements :sparkler:
  * Fixed a :bug: bug where if all medications are inactivated the Med dropdown would be empty showing the last active medication
  * - Changed the name of the `Client` type to `TClient` and moved it into global.d.ts - Added some documentation in RecordTypes.ts
  * Use a Client object that contains all the data for the client
  * Prevent tooltip from showing in printout for checkout all feature
  * Merge branch 'no-toast-printed'
  * 0.9.2
  * Prevent Toasts from showing in printouts
  * 0.9.1
  * Merge pull request #215 from RyanNerd/213-med-dropdown-checkout-indicator
  * UI :lipstick: enhancement for Med Dropdown
  * 0.9.0
  * Tweaking the Checkout All feature UI :lipstick:
  * 0.8.27
  * Remove ; from ManageDrugPage.tsx render
  * Merge pull request #214 from RyanNerd/143-checkout-meds-on-deactivate
  * All Medication Checkout Feature
  * PillPopover Improvements
  * Merge pull request #212 from RyanNerd/211-state-render-med-pb-list-group
  * Fix :wrench: state sync with MedicinePage and PillboxListGroup
  * Fix warnings :warning: in the React console
  * 0.8.26
  * Added `medicineOtcList` constant to MedicinePage
  * Global State moved up for PillboxCard
  * Simplify `gridLists` prop processing
  * 0.8.25
  * Merge pull request #210 from RyanNerd/209-pillbox-log-grid
  * Pillbox components use `gridLists` prop to reduce prop drilling
  * Last of the JSDoc linting rules and fixes :wrench:
  * More JSDoc linting rules and fixes :wrench:
  * 0.8.24
  * JSDoc linting rules and many fixes :wrench:
  * Even More linting settings and fixes
  * 0.8.23
  * More linting settings and fixes
  * Added ``'react-hooks/exhaustive-deps':'error'` to the linter
  * OverlayTrigger has a TS bug :bug: for required attributes, that aren't really required
  * 0.8.22
  * Added some plugins to the linter
  * 0.8.21
  * Merge pull request #206 from RyanNerd/201-show-pillbox-name
  * Show pillbox name in Grids
  * 0.8.20
  * Make it more obvious when in DEV mode
  * 0.8.19
  * Merge pull request #205 from RyanNerd/169-error-boundary
  * Experiment with <ErrorBoundary>
  * Merge pull request #204 from RyanNerd/tslint2eslint-pretty
  * Convert from tslint to eslint and using prettier
  * 0.8.18
  * Make all props in CheckoutGrid required
  * 0.8.17
  * Merge pull request #203 from RyanNerd/202-create-checkout-grid
  * Create CheckoutGrid
  * 0.8.16
  * Added missing hook dependancy
  * 0.8.15
  * Merge pull request #200 from RyanNerd/196-refactor-medlistgroup
  * Pillbox logging and UI Improvements
  * 0.8.14
  * Merge pull request #197 from RyanNerd/195-remove-local-storage
  * Pillbox Remove Local Storage
  * 0.8.13
  * Merge pull request #194 from RyanNerd/pillbox-log-history
  * Pillbox Drug Log History
  * 0.8.12
  * Merge pull request #192 from RyanNerd/190-ui-pillbox-listgroup-improvement
  * Log Pillbox and UI Improvements
  * 0.8.11
  * Only Log Pillbox Items if the medicine is active
  * Add Strength of drug to PillboxListGroup Card
  * History should include inactive drugs
  * 0.8.10
  * Merge pull request #189 from RyanNerd/188-fix-bs
  * BS Color Fix :wrench:
  * Revert "BS Color Fix"
  * BS Color Fix
  * 0.8.9
  * Capitalize Pillbox Name in dropdown
  * Merge pull request #187 from RyanNerd/checkout-badge
  * More Medicine Checkout Improvements
  * Merge pull request #184 from RyanNerd/checkout-badge
  * Add a badge to the Print Checkout buttons
  * Merge pull request #183 from RyanNerd/179-remove-med-checkout-tab
  * Remove Med Checkout Tab
  * Alert pillbox name was not capitalized
  * 0.8.8
  * Merge pull request #181 from RyanNerd/pillbox-ui-improvement
  * Pillbox UI :lipstick: Improvements
  * Merge pull request #180 from RyanNerd/druglog-notes-can-be-null
  * Fix :bug: issue where drugLog.Notes could be null
  * MedicinePage was pitching a fit about importing DrugLogHistory.tsx so this got renamed to MedDrugLogHistory.tsx
  * 0.8.7
  * Merge pull request #178 from RyanNerd/177-credentials-need-alert
  * LoginPage wasn't showing alert with failed credentials :lock:
  * Merge pull request #176 from RyanNerd/simple-ifs
  * Reformat :construction_worker: Code in several modules
  * 0.8.6
  * Merge pull request #175 from RyanNerd/manage-rx-toast
  * Add Toast :bread: to ManageDrugPage
  * 0.8.5
  * Merge pull request #174 from RyanNerd/disabled-spinner-children
  * DisabledSpinner UI :lipstick: Improvements
  * Merge pull request #173 from RyanNerd/med-dropdown-subtext
  * Better UI for other drug names in dropdown
  * Merge pull request #172 from RyanNerd/170-medicine-drop-down-other
  * Display Other Drug Names in dropdown
  * 0.8.4
  * Merge pull request #171 from RyanNerd/code-clean-up
  * Code clean up
  * 0.8.3
  * Fixed About.tsx to allow using X to close
  * 0.8.2
  * removal of PopoverButton.tsx as it is unused
  * Add missing type declarations in reactn
  * Merge pull request #168 from RyanNerd/145-remove-apikeyobserver
  * Simplify the login authentication process
  * Simplify About modal
  * Merge pull request #167 from RyanNerd/163-fix-asyncwrapper-ts-errors
  * Fix :wrench: `asyncwrapper()` typing errors
  * Merge pull request #166 from RyanNerd/print-history-formatting
  * Print History Formatting
  * Merge pull request #165 from RyanNerd/more-ui-changes-pillboxlistgroup
  * Redesign UI :lipstick: PillboxListGroup
  * Merge pull request #164 from RyanNerd/pillbox-ui-change
  * Redesign UI :lipstick: PillboxListGroup
  * Suppress TypeScript errors that suddenly became a problem
  * 0.8.1
  * Removal of the unused MedicineDetails grid
  * Merge pull request #161 from RyanNerd/159-create-otclistgroupgrid
  * Create a grid specifically for OtcListGroup
  * Merge pull request #160 from RyanNerd/157-create-manageotcgrid
  * Create a grid specifically for ManageOtcPage
  * Merge pull request #158 from RyanNerd/147-add-search-manage-otc
  * Add Search :mag: Textbox to Manage Otc Tab
  * Merge pull request #156 from RyanNerd/154-refactor-druglog-grid
  * Refactor Drug History
  * Merge pull request #155 from RyanNerd/152-drug-history-rx-tab
  * Add History Radio Button to Rx tab - Factored out the meat of DrugHistoryPage into DrugHistory.tsx - DrugHistoryPage and MedicinePage use DrugHistory for display of drug log history and print - Added "(OTC)"" to the DrugLogGrid indicating an OTC drug log - Memoized DrugHistoryPage in the LandingPage to reduce re-renders
  * Merge pull request #153 from RyanNerd/149-remove-the-drug-log-table-from-manag
  * Remove Drug Log table from ManageDrugPage
  * Reorganization and Toast own component
  * Merge pull request #151 from RyanNerd/fix-checkout-drug-history
  * Show checkouts in drug log history
  * Merge pull request #150 from RyanNerd/performance
  * Performance :runner: enhancements
  * Performance :runner: enhancement
  * 0.8.0
  * Merge pull request #142 from RyanNerd/pillbox-full-feature
  * UX :bar_chart: Improvement
  * UI :lipstick: improvement
  * Toasts UI :lipstick: improved
  * Limit the DrugLogList to the last 5 days
  * Experimental hook for checking idle
  * - Improved the performance of the pillboxMedLog[] -
  * UI :lipstick: Improvements
  * PillboxListGroup takes children as a prop
  * Pillbox Display
  * PillboxListGroup.tsx changes
  * Code clean up
  * Removal of ClientObserver.ts
  * Removal of the PillboxObserver.ts
  * Removal of the PillboxItemObserver.ts
  * Removal of the DrugLogObserver.ts
  * Code clean up - Remove unneeded `e: React.MouseEvent<HTMLElement>` arguments in MedicineDetail.tsx and components that use it. - Moved the todo: add search box to Manage OTC from comment to an issue - Fixed a bug where even if cancel was chosen do delete an OTC drug the drug would get deleted anyway.
  * Print Medicine Checkout
  * - Change import for react-bootstrap to use direct imports for all components - When the OTC search textbox is cleared the `activeOtc` gets set to null. This was causing visual sync up issues. The search text would be set to an empty string but the selected drug would still be active.
  * Many changes
  * Make multiSort() generic
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * Refactoring
  * Fix :wrench: some UI :bug: bugs
  * More UI :lipstick: on MedicinePage
  * UI :lipstick: Changes
  * Fixing my brain fart
  * Fix :wrench: deleting a drugLog wasn't refreshing the `drugLogList`
  * removed lastTaken as a useState()/useEffect()
  * Removed `drugLogList` from MedicinePage
  * Merge remote-tracking branch 'origin/pillbox-full-feature' into pillbox-full-feature
  * Attempted a refactor of the async DrugLog
  * UI :lipstick: Change to log buttons
  * UI :lipstick: Change to log buttons
  * Significantly Simplified PillboxListGroup
  * Significantly Simplified PillboxListGroup
  * Refactored some pillbox log history functions
  * Partially fix "update" in the MedicineManager.ts
  * Attempt at getting Log Pillbox functionality
  * Show pillbox items in the med dropdown list
  * = Disable the Pillbox radiobutton if `medicineList` has less than 5 items
  * - OtcListGroup search textbox autoFocus - The MedicineDetail grid row will appear in bold if selected
  * Minor code clean up in MedicinePage.tsx
  * Simplified OtcListGroup
  * Flatten and sort all imports
  * - Fixed a missing useEffect dependency in MedicinePage.tsx - Flattened imports   - See: https://dev.to/nilanth/no-more-import-in-react-2mbo
  * Remove `activeClient` global
  * Manage activeMed state better when adding med
  * Keep state of activeMed when drugs are logged
  * :broom: Clean up code
  * Move all PillboxPage.tsx into PillboxListGroup.tsx - Moved the logic from PillboxPage as a landing page item instead making it a ListGroup item - Fixed a bug in `getPillboxItemS()` where the filter wasn't including the `pillboxId` - Removed the PillboxPage from the LandingPage - Added PillboxCard.tsx as a more feature rich PillboxItemGrid - MedicinePage.tsx updated to use PillboxListGroup new features and PillboxCard - PillboxItemGrid.tsx :building_construction:  scaffolding added for click on row functionality - PillboxListGroup.tsx placeholder replaced with actual logic and features :atom_symbol: - Destroyed :bomb: PillboxPage.tsx - Destroyed :bomb: MedicineListGroup.tsx
  * - Set initial state of `activeMed`, `activeOtc` & `activePillbox` by using `usePrevious()` hook. - Changed `LIST_TYPE` to `DISPLAY_TYPE` and added a Print to the enum. - Removal of the `<Collapse>` component in OtcListGroup.tsx - Conditional rendering fixed and updated in MedListGroup.tsx - LandingPage.tsx documentation updated
  * Moved state back down to components in LandingPage
  * Major :ringed_planet: :construction_worker: Overhaul of MedicinePage - MedicinePage can now be in one of three states:   1. Medicine - select and log prescriptions   2. OTC - Select and log OTC drugs   3. Pillbox - Select a pill box and log drugs therein - Complete UI :lipstick: redesign for MedicinePage.tsx - MedListGroup changed to **only** handle prescriptions (was handling pillbox and drugs -- needed separation of concerns) - Removed Show/Hide OTC buttons in OtcListGroup - Added PillboxListGroup.tsx - Added radio buttons Medicine, OTC, and Pillbox to let user set state. - OtcList global moved to LandingPage.tsx and passed into MedicinePage.tsx
  * - Minor code clean-up in About.tsx - ActiveResidentObserver.ts uses the `usePrevious()` hook now. - ApiKeyObserver.ts uses `asyncWrapper()` for better error control. - Minor code clean-up in ConfirmDialogModal.tsx - Very minor code clean-up in ErrorDetailsObserver.ts (removed a space) - Added function getPillboxItems.ts so MedicinePage.tsx and PillboxPage.tsx can share code. - Added `IPillboxItemObserver` interface to global.d.ts - Some code clean-up for LandingPage.tsx as well as some todos. Also `<PillboxPage>`` takes additional attributes passed in from LandingPage. - Minor code clean-up in MedDropdown.tsx - Added `<PillboxItemGrid>` to be displayed when the selected activeId is a pillbox. - Code clean-up for MedListGroup.tsx  - `<TooltipButton>` replaced with a standard `<Button>`  - Removed `tooltipText()` since it was displaying with the `<ToolTipButton>` anyway  - Added a + Log ALL Drugs in Pillbox button (not currently functional - PillboxItemGrid.tsx uses getPillboxItems.ts to build out the `PillRows. Some code clean-up. - Code clean-up in PillboxItemObserver.ts - PillboxPage.tsx   - Added props refresh for `pillboxItemList`, `pillboxList`, and `activePillbox`   - Use `getPillboxItems()` to fetch `PillboxItemRows` - Added a `usePrevious()` hook.
  * - Continued the overhaul of MedicinePage.tsx to use MedListGroup.tsx and support pillboxes. activeId is used instead of activeDrug. - Moved state from MedDropdown.tsx for the buildout of the listItems to MedListGroup.tsx. This solved a bunch of issues. - Removed the `medicineList` and `pillboxList` from MedDropdown.tsx replacing them with an `itemList` prop that comes from the MedListGroup.tsx solving a bunch of issues.
  * - Added `React.StrictMode` to all things ` <LandingPage>` :small_airplane: - Moving state up to the LandingPage.tsx for global lists. - Starting on the major revamp of MedicinePage.tsx so that it can support Pillboxes - MedListGroup.tsx created to replace MedicineListGroup.tsx - MedDropdown.tsx replaces MedicineDropdown.tsx - Minor :lipstick: cosmetic changes to PillboxEdit.tsx - Minor :lipstick: changes in PillboxPage.tsx
  * - :lipstick: Code Formatting
  * - :lipstick: UI formatting for the `TabPane` in PillboxPage.tsx   - The `Card.Title` now has a formatted pillbox name that looks similar to the selected `Nav` item.   - Added some text to help users know how to determine what is in the selected pillbox - Added Bootstrap color enumerator `BsColor` to common.ts - Both PillboxPage.tsx and PillboxItemGrid.tsx use `BsColor` enum
  * - Quantity selection in PillboxItemGrid.tsx is now a dropdown split button - Scaffolding set up for `onEdit()` handling in PillboxPage.tsx
  * - Significantly changed how PillboxItemGrid.tsx works by:    - sorting on Quantity, Drug    - Removed :boom: delete button    - Added small buttons of + qty    - All medicines for the client are displayed in the grid - PillboxPage.tsx changed to handle the new signature of PillboxItemGrid.tsx - Added _multiSort()_ function in common.ts to handle multiple column sorting.
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature - Got default pillbox and tab content to work via `active` attribute - Added a really important field to `PillboxItemRecord` (MedicineId was missing) - PillboxItemObserver.ts removal of `console.log()` diagnostic - PillboxItemGrid.tsx component added - Removal of unused imports in PillboxEdit.tsx - Moved state for PillboxPage up to the LandingPage.tsx
  * Update README.md and LICENSE.txt
  * Pillbox Feature
  * Pillbox Feature
  * 0.7.2
  * Merge pull request #141 from RyanNerd/manage-rx-row-size
  * UI :lipstick: fix :wrench: for ManageRx tab
  * 0.7.1
  * Fix a regression :bug: in MedicineEdit.tsx
  * Merge pull request #139 from RyanNerd/active-switch
  * 0.7.0
  * Medicine Active checkbox and Other drug names
  * 0.6.1
  * - When coping a the client name to the clipboard use the format FirstName LastName (was Lastname, FirstName) - Spelling fix in DiagnosticPage.tsx
  * Merge pull request #136 from RyanNerd/pillbox
  * 0.6.0
  * Search criteria signature change
  * Search criteria signature change
  * Dependency version & Diagnostics
  * Merge pull request #133 from RyanNerd/client-dropdown-minor-change
  * 0.5.1
  * Client dropdown addition
  * Version bump
  * Merge pull request #132 from RyanNerd/108-force-print-dialog-when-a-new-client
  * When adding new client show print dialog
  * Merge pull request #131 from RyanNerd/129-when-the-system-crashes-the-client-n
  * When ErrorDetails displayed unset ActiveResident
  * Fix a minor spelling error in code comments
  * Merge pull request #130 from RyanNerd/124-change-how-name-button-popover-works
  * Revamp the client name and DOB buttons
  * [WIP] Revamp the client name and DOB buttons
  * Merge pull request #128 from RyanNerd/121-notes-and-directions-for-packs-
  * For DrugHistory use a combo of Notes & Directions
  * Chage link text in About.tsx for issues - Closes #125
  * Updated the docblock for `clientFullName()` in common.ts
  * Merge pull request #127 from RyanNerd/nick-name
  * Nickname added to client / resident
  * Merge pull request #120 from RyanNerd/119-validate-client-dob-is-not-in-the-fu
  * Prevent DOB set in future
  * Merge pull request #118 from RyanNerd/112-medicineedit-fill-date-validation-
  * Prevent future Fill Date when editing Medicine
  * Merge pull request #117 from RyanNerd/109-change-isdayvalid-ismonthvalid-and-i
  * isYear, isDay, and isMonth Valid signature change
  * 0.4.5
  * npm run build exports memory limit before running
  * Small update to README.md
  * Merge pull request #116 from RyanNerd/115-clicking-on-client-dob-button-should
  * Launch edit modal for active client when DOB button clicked
  * Merge pull request #114 from RyanNerd/110-figure-out-why-the-medicineedit-moda
  * Fix 🔧 display issue with MedicineEdit.tsx
  * Merge pull request #113 from RyanNerd/tweak-fill-date-validation
  * Medicine Fill Date 📅 validation 👮
  * Merge pull request #111 from RyanNerd/fix-fill-date
  * Add Fill Date validation 👮
  * Merge pull request #107 from RyanNerd/quack-quack-die
  * Remove 🦆 typing from ManageDrugPage.tsx
  * Merge pull request #106 from RyanNerd/druglog-edit-validation
  * - Consolidated `getDrugName()` in common.ts - Code clean-up 🧹
  * [WIP] Don't show Out or In fields in DrugLogEdit if OTC
  * Removed a todo that was done
  * Merge pull request #101 from RyanNerd/spinner-observer
  * Add spinner to indcate when system is busy
  * Add spinner 🎡 to Medicine Dropdown when disabled
  * Merge pull request #100 from RyanNerd/observer-finally
  * Use `finally()` in observer promises
  * Delay before invoking print dialog for ClientRoster
  * LoginPage 👷 Rework
  * 0.4.4
  * Merge pull request #99 from RyanNerd/login-flair
  * LoginPage 👷 Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage 👷 Rework
  * Clean-up 🧹 code and documentation
  * Version Modal Additions
  * 0.4.3
  * Determine the version via npm env
  * 0.4.2
  * Merge pull request #98 from RyanNerd/revamp-otc
  * Revamp 💄 👷 OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp 👷 the OTC ListGroup
  * 0.4.1
  * Merge pull request #97 from RyanNerd/fix-dupe-client-issue
  * Fix  Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * 0.4.0
  * Merge pull request #96 from RyanNerd/client-notes
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * 0.3.18
  * Fix 🔧 + OTC and Edit OTC buttons from bleeding through
  * Merge pull request #95 from RyanNerd/version-update
  * Version updates in package.json
  * Add useStickyState hook for possible future use
  * More code changes to TooltipButton
  * Fix missing required attributes in TooltipButton
  * Get rid of the useless @constructor in JSDOC headers
  * Get rid of the useless @constructor JSDOC
  * Merge pull request #94 from RyanNerd/about-page
  * 0.3.17
  * Add About Modal
  * Merge pull request #93 from RyanNerd/client-name
  * 0.3.16
  * Client name and DOB headers are separate buttons
  * Merge pull request #92 from RyanNerd/fix-client-name-update
  * 0.3.15
  * Fix 🔧 ActiveResident global not getting updated when client info updated
  * Merge pull request #91 from RyanNerd/client-printout
  * 0.3.14
  * Add Feature to Print Client Roster
  * 0.3.13
  * Merge pull request #90 from RyanNerd/client-roster
  * Add Feature to Print Client Roster
  * Merge pull request #89 from RyanNerd/fix-drug-log-edit
  * 0.3.12
  * 🔧 Fixed DrugLogEdit
  * Merge pull request #88 from RyanNerd/bulk-med-checkout
  * 🔧 Fixed Print Medicine Checkout in Manage Rx tab
  * Merge pull request #87 from RyanNerd/bulk-med-checkout
  * 0.3.11
  * Log Drug from Manage Rx tab
  * 💄Log Drug from Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * Date.toLocaleString() TS fix
  * Merge pull request #86 from RyanNerd/otc-in-rx-page
  * 0.3.10
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and medical logging
  * Merge pull request #82 from RyanNerd/show-client-print
  * Add client name and DOB to DrugHistoryPage print area
  * 0.3.9
  * Merge pull request #81 from RyanNerd/get-version-from-package.json
  * Use package.json to obtain version
  * Merge pull request #80 from RyanNerd/fix-print-margins
  * Fix print margins
  * Merge pull request #79 from RyanNerd/fix-drug-history-print
  * Allow the printing of the client name in DrugHistoryPage
  * Bumped up RxChart version in package.json
  * Added Out and In columns to MedicinePage drug log grid
  * Merge pull request #78 from RyanNerd/no-print
  * Print MedicineCheckout Enhancements and 🔧 Fixes
  * Merge pull request #77 from RyanNerd/dependancy-version-update
  * Upgrade ⬆ dependency versions
  * Merge pull request #76 from RyanNerd/disable-login-field-empty
  * Disable Login button if password or username are empty 🗑
  * Merge pull request #75 from RyanNerd/base-url-error-message
  * Display error message if .env is missing or BASEURL isn't set
  * Bumped the version in package.json
  * 💊 Medicine Checkout Feature
  * Merge pull request #74 from RyanNerd/medicine-checkout-feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💥 Remove `<any>` type
  * ♻ Refactor Validation 👮 code into its own 📁
  * 🔧 Fix `drawBarcode()` to verify the canvas element exists before trying to draw the barcode
  * 💊 OtcPage.tsx
  * 💊 MedicinePage
  * 💊 MedicinePage
  * 💊 MedicinePage 🐛 fix
  * 🔨 Fix pressing enter in search textbox causes app to reset.
  * 🔧 Fix NPM dependency ➕
  * Revert tsconfig.json
  * tsconfig.json is pitching a 😠 fit
  * Removed the development 🙈 requirement for the DiagnosticPage.tsx
  * Merge pull request #73 from RyanNerd/disable-log-buttons
  * 🎇 Added disable feature to the log buttons
  * ⬆ Upgraded dependencies
  * 0.3.5
  * 0.3.4
  * Merge pull request #72 from RyanNerd/fix-scroll-to-modal
  * Removed scrollTop feature from all tab pages
  * Merge pull request #71 from RyanNerd/prevent-client-dupe
  * ResidentManager fixed 🔧 to prevent dupes
  * ♻ setApi() changed to emit a promise - Loading of client records, OTC records now only happens AFTER the apiKey is set for ALL providers. - Discourse on the Observer middleware architecture is exhastively commented in App.tsx
  * Consolidation 🧑‍🤝‍🧑 of the AuthObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the OtcMedicineObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the DrugLogObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the MedicineObserver 🔭
  * Merge pull request #70 from RyanNerd/observer-consolidation-client
  * Consolidation 🧑‍🤝‍🧑 of the ClientObserver 🔭
  * Added `logout` as a global 🌎 hook 🎣
  * 💄UI Improvements in MedicinePage
  * :boom: removed `console.log()` from UpdateClientObserver.ts
  * ♻ When a new client is added make that client active
  * 💥 Removal of Search box from MedicinePage
  * Merge pull request #69 from RyanNerd/code-reformatting
  * - 💄Code formatting for multiple modules
  * - 💄JSDoc  and code formatting changes
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * Merge pull request #67 from RyanNerd/otcpage-using-table
  * 💄 UI for OtcPage changed to list 📜 OTC drugs in a table
  * Fix 🔧 a minor linting problem
  * Add Search 🔍 Validation
  * ♻ Refactored <LogButtons> into its own component
  * Added Log button stack to the ListGroup
  * 🚘 In progress - OtcPage using table instead of MedicineListGroup
  * 💄 Changed Tab order in LandingPage.tsx
  * Merge pull request #66 from RyanNerd/hooks-4-updates
  * OtcPage now uses declarative hooks 🎣 for updates and delete processing
  * 💄A little bit of code clean-up 🧹
  * A couple of hooks 🎣 added for OTC
  * 💄Code formatting and adding better comment 💬 headers
  * ♻ Refactoring
  * `login` is now a global 🌎 hook 🎣 that is set to the `{username, password}` when a user logs in.
  * `refreshOtc` is now a hook 🎣 trigger 🔫 for when the otcList needs to be refreshed.
  * - `deleteMedicine` is now a hook 🎣 trigger 🔫 for when a MedicineRecord is to be deleted. - 💄Reorganized the code in App.tsx
  * - `deleteDrugLog` is now a hook 🎣 trigger 🔫 for when a DrugLogRecord is to be deleted. - Fixed a 🐛 in the DiagnosticPage where `CloseErrorButton` wasn't inside the `useMemo()` - Changed MedicineManger, MedicinePage, and OtcPage with how it handles deletes in prep for the next salvo of changes.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Merge remote-tracking branch 'origin/hooks-4-updates' into hooks-4-updates
  * 🎣 App.tsx is the single source of truth via hooks 🔧 Fixed a problem when the medicine dropdown changes the selection would revert back to the original value.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 💄Code format changes
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Add ShadowBox 🔲 to Directions in MedicineListGroup - Just for flare's 🌈 sake
  * Merge pull request #65 from RyanNerd/toggle-switch
  * Merge pull request #64 from RyanNerd/shadow-box
  * Add ShadowBox 🔲
  * Add ToggleSwitch 💡
  * 🔧 Fixed the double underline for the medicine link ⛓
  * 💄Add link ⛓ on MedicinePage for drugs 💊 - Added some flair 🌈 to the link via CSS - Link uses [GoodRx](https://goodrx.com)
  * Merge pull request #63 from RyanNerd/react-upgrade-workaround
  * 🔧 Work-around a 🐛 with ⚛ React 17 and DropdownButton - See: https://github.com/react-bootstrap/react-bootstrap/issues/5409 - The work around is here: https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584 - package.json was changed to bring in React ⚛ v17.0.1
  * Add support for Willow 🌳 API error handling - ♻ Refactored DiagnosticPage by adding <CloseErrorButton> reusable component - 🌳 Willow API error parsing added to DiagnosticPage.tsx
  * ♻ Refactoring to import using reactn when possible
  * Merge pull request #62 from RyanNerd/error-state-logout
  * Disable Login page when there is an error
  * 🥅 DiagnosticPage now resets correctly when dismissed - Changed order of operations with LoginPage when testing errors. - Changed LandingPage handling `dismissErrorAlert()` to set global state back to initial values.
  * 🎨 Change activeTabKey state to be string only
  * 💄Added Log 3 & log 4 buttons - Buttons added to MedicineListGroup, MedicinePage, and OtcPage - Added scroll to top for all pages when that page becomes active (except for the LandingPage as that page is always active whem the app starts)
  * Add 📜 Scroll-to-top logic in the ResidentPage when it becomes active
  * 💄When a resident is selected reset the search textbox to an empty string. After a resident is selected when the user returns to the ResidentPage tab typically they are looking to select a different resident or add one and reseting the search textbox to empty string shows the entire resident list.
  * 💄More code formatting in ResidentPage
  * 💄Code formatting 🔨 fix in ResidentPage
  * Merge pull request #61 from RyanNerd/resident-search
  * Add a search 🔍 filter to ResidentPage
  * 🐟 Upstream merge from master
  * 💄Make the Medicine tab title Rx
  * Add search 🔎 to ResidentPage
  * 💄Make all modals backdrop = ⚡static⚡ Modals can no longer be dismissed by clicking off the modal.
  * Added missing `ResidentId` to DrugLogRecord
  * 💄 ResidentGrid now shows Created and Activated columns as formatted dates
  * 📜 Scroll to the top of the page when MedicinePage is active
  * 🔥Removal of no-namespace rule in tslint.json The previous merge allows this rule to be reestablished as the default
  * Merge pull request #60 from RyanNerd/bwip-js-update
  * 🔥Removal of bwip-js.d.js the 👽📦 updated
  * :rotating_light: Added `tslint-react-hooks` to the linter
  * ♻ Refactored ✈LandingPage and  ⚕DrugHistoryPage ⚕DrugHistoryPage now uses globals instead of props Single responsiblity.
  * ✈ LandingPage uses CSS to bold active tabs This used to be done via a function.
  * 💄Cosmetic changes to LandingPage
  * Merge pull request #59 from RyanNerd/active-tab-key
  * ⚡ Improve performance by only rendering tab content when that tab is active Added the prop `activeTabKey` to a number of Pages and put conditional logic in place to prevent render when that tab isn't the active tab.
  * Minor code format 🔨 fix
  * ♻ Refactor MedicinePage, OtcPage, and DrugLogGrid - Make `getObjectByProperty()` generic - Move `getDrugName()` to common.ts for refactoring.
  * 💡Updated DocBlocks to be more concise Also removed 🔥 unneeded `: void` return types
  * Minor change when adding new resident auto switch to Rx tab
  * Changed `calculateLastTaken` to use Created date instead of Updated.
  * Merge pull request #58 from RyanNerd/api-set-change
  * 🔧 Fixed a problem with the DropDown button The dropdown button would stop working after a modal was opened. After a 🌦 day of pulling my 🦱 out trying to figure out what had happened. Finally found this: https://github.com/react-bootstrap/react-bootstrap/issues/5409 Had to thunk React back down to 16.14.0
  * Changed how APIs get set in the providers
  * Merge pull request #57 from RyanNerd/external-package-upgrades
  * Updated several 📦 packages to the latest version bootstrap.min.css was removed 🔥 from the public folder and the stylesheet link in index.html was also removed index.tsx now imports bootstrap.min.css using the NPM package The following 📦 packages were upgraded: - React ⚛ - bootstrap 💄 - bwup-js - typescript 📜 One package was removed: - react-new-window
  * Merge pull request #56 from RyanNerd/frak-upgrade
  * Update Frak to latest version and 🔧 fix Providers - 👽 Frak package is no longer an object but is now a function. All providers changed accordingly. - Error 🐛 handling was updated in DiagnosticPage since Frak no longer emits a custom error, but ⚾ throws the Response as an error when there is an exception.
  * Merge pull request #55 from RyanNerd/gotta-catch-em-all
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Automatically activate ⚡ the Rx (medicine) when a resident is selected
  * Added a dismiss 🔥 option for `_alert()` allowing users to log back in. Also 🚛 moved `_alert()` into `useMemo()`
  * Add 📃 JSDoc blocks to DiagnosticPage.tsx Also added some additional 🦆 type checking logic
  * Merge pull request #54 from RyanNerd/diagnostics-retool
  * Retooling 🔧 of DiagnosticPage.tsx
  * Merge pull request #53 from RyanNerd/global-error-handling
  * :bug: Error handling is now done via a 🌎 global called `errorDetail` All components in the Page directory no loger call `onError()` but instead now use `errorDetails()` Moved the observer that hides the Diagnostic tab to the DiagnosticPage.tsx 💄Improved the code in DiagnosticPage.tsx to better display errors depending on the type of error. The error prop that DiagnosticPage.tsx receives is of the type `any` so some 🦆 typing logic was added. global.d.ts and getInitialState.ts were 🔝 updated to handle the new global `errorDetail` TODO: Make the DiagnosticPage.tsx use an accordion component when showing details. This will be a future task.
  * ✨ Added code in LandingPage to more cleanly set the tab titles and bold the tab that is active.
  * Merge pull request #52 from RyanNerd/auth-manager
  * ♻ Refactor Providers and establish AuthManager 🗑 Removed ProviderTypes.ts moving the type definitions to the individual providers ✨ Created AuthManager to be consistant with design
  * ResidentPage code clean-up 💄 🗑 Removed `refreshDrugs()` since it was only being called from one place and refactored ♻ the code into the orginal caller.
  * 🔧 Fix ResidentPage which had a recursive 🐛 🗑 Removed the `useEffect()` and replaced it with `refreshDrugs()` upon edit/add/select/delete operations
  * ♻ Refactored all the .tsx files in the Pages directory to the components directory
  * Merge pull request #51 from RyanNerd/autoload-lists
  * Handle resident changes via useEffect to reload 🔃 residentList, medicineList, and drugLogLists ♻ Refactored ResidentManager eliminating 🗑 the complexity
  * Merge pull request #50 from RyanNerd/medicine-manager
  * ♻ Refactored ManageDrugPage, ManageOtcPage, and OtcPage to use the :sparkles: new MedicineManager.ts
  * ♻ Refactored MedicinePage to use :sparkles: new MedicineManager.ts
  * Merge pull request #49 from RyanNerd/current-resident
  * 💄Cosmetic code changes and made providers more logical ♻ Refactored the Providers to take baseUrl as an argument 🗑 Removed baseUrl from the globals
  * ✨ Major ♻ refactoring for Resident bussiness logic  Moved all business logic to a ResidentManager module.
  * More 🚲 Bikeshedding cosmetic 💄 code changes to multiple modules
  * 🚲 Bikeshedding some 💄 cosmetic code changes to MedicineListGroup
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to ResidentGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to MedicineDetail
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to DrugLogGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to TooltipButton
  * :sparkler: Added AuthenticationProvider
  * :rocket: Major revision to providers making them type safe :closed_lock_with_key:
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to OtcPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to ManageOtcPage
  * :lipstick: Cosmetic code changes to MedicinePage
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to ResidentPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: cosmetic code changes  uses global State as an interface
  * :lipstick: cosmetic code changes in
  * :lipstick: cosmetic code changes defaulting to empty arrays for lists instead of null
  * :scroll: Typing and :lipstick: cosmetic code changes to DrugLogGrid and DrugHistoryPage
  * :lipstick: Cosmetic code changes including an .editorconfig file to enforce style
  * More :lipstick: Cosmetic changes to the code (indentation and other)
  * :lipstick: Cosmetic changes to the code (indentation and others)
  * :sunglasses: Simplfy the providers even more
  * Further reduce the warning noise :loud_sound: in the console log by :wrench: fixing the show prop to be bool
  * Eliminate the warning noise :loud_sound: in the console log by changing onAnswer to onSelect
  * :sunglasses: Simplify all providers to use Frak directly
  * Merge pull request #48 from RyanNerd/frak-npm
  * Use Frak from the NPM :package:
  * :arrow_heading_up: Update React to 16.14.0 and add lint rules for code line length and :wrench: fix modules that violated the new rule.
  * Added tslinter :heavy_check_mark: and updated all code
  * :wrench: Fix code indentation in ResidentGrid
  * :wrench: Fix code indentation in MedicineDetail
  * :sunglasses: Simplify DrugLogGrid
  * :tractor: Moved  into  and some :scroll: typing changes
  * :scroll: Type code changes in common
  * :sunny: Clean up code for the  function
  * tractor: Moved  to common
  * useForceUpdate deleted :wastebasket: as it was not being used. :scroll: Types extended for TooltipButton
  * :wrench: Fix :scroll: typings in MedicineListGroup for logDrug callback
  * :wrench: Fix :scroll: typings in MedicineListGroup for barcode canvas
  * :wrench: Fix :scroll: typings in MedicineListGroup and OtcPage
  * :wrench: Fix the typings in DrugDropdown and MedicineListGroup
  * :lipstick: Make IProps interface definiton more specific in ResidentGrid
  * :lipstick: Center text for Selected column in ResidentGrid
  * :lipstick: Add Reload button in ResidentPage and :wrench: tighten up code
  * :wrench: Fix ResidentPage to use TooltipButton
  * :lipstick: Remove condenced class from the Resident table
  * Code format :lipstick: changes in Frak
  * :sunglasses: Simplify LastTakenButton
  * :lipstick Don't display the LastTakenButton if the lastTaken value is null
  * :wrench: Fix the display :lipstick: of Last Taken (hours)
  * :wrench: Fixed :lipstick: formatting in DrugLogGrid for Drug and Created rows
  * :sunglasses: Simplify bolding in ResidentGrid and DrugLogGrid
  * :lipstick: Made selected resident row bold. :wrench: fixed the drug log grid to show in bold when drug logged today
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :star2: Add missing Doc-Blocks and :wrench: fix a bug in ResidentPage where medicine logs weren't loading
  * :lipstick: Cosmetic changes to Fill Date display
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in MedicinePage
  * :wrench: Fixed error handling in MedHistoryProvider
  * :wrench: Fixed error handling in MedicineProvider
  * :wrench: Fixed error handling in ResidentProvider
  * :wrench: Error handling and added DiagnosticPage to display errors
  * :twisted_rightwards_arrows: Refactor ResidentPage and fix a :bug: in ResidentProvider
  * :wrench: Tightened up code in ResidentPage
  * :lipstick: Make mouse cursor default when the Log 1 / Log 2 buttons are disabled
  * :eight_spoked_asterisk: More changes to the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :eight_spoked_asterisk: Change the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :arrow_heading_up: Upgraded bootstrap.min.css to latest version 4.4.1
  * :rainbow: Changed the color scheme of the DrugLogGrid based on lastTaken
  * :sunglasses: Simplify the LastTakeButton (remove unused props)
  * :cyclone: Major code clean-up
  * :twisted_rightwards_arrows: Refactor DrugLogGrid to use getObjectByProperty()
  * :lipstick: Show drug name in Delete confirmation dialog for OtcPage and MedicinePage
  * :twisted_rightwards_arrows: Refactor deleteDrugLog
  * :sunglasses: Make MedicineDetail a component with props
  * :sunglasses: Make DrugLogGrid more generic
  * :fire: Remove RxTable and use the Table component instead for simplicity :sunglasses:
  * :sunglasses: Make the MedicineDetail more generic
  * :lipstick: Costmetic change make last taken variant color consistant
  * :twisted_rightwards_arrows: More ResidentPage simplification
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :lipstick: Cosmetic change for Delete confirm in ManageOtcPage
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * Fix a :bug: in Confirm and have ManageDrugPage use the new component
  * Create Confirm in the Modals directory as a better more generic ConfirmationDialog
  * Make the ConfirmationDialog more generic :older_man:
  * Add a more prominant warning :warning: when an OTC drug will be deleted
  * Merge pull request #47 from RyanNerd/react-bootstrap-typescript
  * Cosmetic :lipstick: changes to all the tab titles making them bold when active
  * Minor cosmetic :lipstick: code changes
  * :twisted_rightwards_arrows: For consistancy refactor getResidentList
  * :twisted_rightwards_arrows: Refactor remaining refreshList into getLists
  * :twisted_rightwards_arrows: Refactor RefreshMedicineList into getMedicineList
  * Added a :warning: when OTC meds are edited that the change will be for all
  * :twisted_rightwards_arrows: Refactor of ManageOtc, ManageRx, OtcPage, and MedicinePage
  * :beginner: Simplify addEditDrugLog in Medicine and Otc Pages
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage for logging drugs
  * Refactoring of page to Pages
  * :bowtie: Add Log 2 button to MedicineListGroup & fixed a :bug: in OtcPage
  * :bowtie: change layout of OtcPage to better accomidate the drug history grid
  * fix a :bug: with the error handler. Also hide the Diagnostics tab completely when not active
  * :part_alternation_mark: Change how field setFocus works
  * :scroll: TypeScript conversion even more typings and fix an OTC delete bug
  * :scroll: TypeScript conversion even more typings
  * :scroll: TypeScript conversion ResidentProvider typings
  * :scroll: TypeScript conversion ResidentPage fix :bug: DrugLog refresh
  * :scroll: TypeScript conversion ResidentPage typings
  * :scroll: TypeScript conversion More MedicineProvider typings
  * :scroll: TypeScript conversion MedicineProvider typings
  * :scroll: TypeScript clean-up of Frak and elimination of FrakTypes
  * :scroll: Major TypeScript / object conversion for Frak
  * :scroll: TypeScript / object conversion for Frak
  * :scroll: TypeScript conversion Frak
  * :scroll: TypeScript conversion add useProviders() hook
  * :scroll: TypeScript conversion tighten up more code
  * :scroll: TypeScript conversion tighten up code
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for MedicinePage
  * :scroll: TypeScript conversion for ManageOtcPage
  * :scroll: TypeScript conversion for ManageDrugPage
  * :scroll: TypeScript conversion for LoginPage
  * :scroll: TypeScript conversion for RefreshMedicineLog
  * :twisted_rightwards_arrows: Refactor of Provider helpers
  * :scroll: TypeScript conversion for RefreshOtcList
  * :scroll: TypeScript conversion for DeleteMedicine
  * :scroll: TypeScript conversion for RefreshMedicineList
  * :scroll: TypeScript conversion for ResidentProvider
  * :scroll: TypeScript conversion for MedicineProvider
  * :scroll: TypeScript conversion for DrugHistoryPage
  * :scroll: TypeScript conversion for ResidentEdit
  * :scroll: TypeScript conversion for MedicineEdit
  * :scroll: TypeScript conversion :bug: fix for DrugLogEdit
  * :scroll: TypeScript conversion for DrugLogEdit
  * :scroll: TypeScript conversion Fix :wrench: up for ConfirmationDialog
  * :scroll: TypeScript conversion Remove InformationDialog
  * :scroll: TypeScript conversion ConfirmationDialog
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion DrugDropdown
  * :scroll: TypeScript conversion MedicineDetail
  * :scroll: TypeScript conversion DrugLogGrid
  * :scroll: TypeScript conversion ResidentGrid
  * :scroll: TypeScript conversion RxTable
  * :scroll: TypeScript conversion LastTakenButton
  * :scroll: TypeScript conversion for React Bootstrap
  * :curly_loop: Yet even more TypeScript conversions
  * :curly_loop: Even more TypeScript conversions
  * :curly_loop: More TypeScript conversions
  * :curly_loop: Minor TypeScript conversions
  * Merge pull request #46 from RyanNerd/medicine-otc-page-refactor
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage
  * Merge pull request #45 from RyanNerd/otc-feature
  * :lipstick: Even more cosmetic changes & fix to attribute={true} making React mad
  * :lipstick: More cosmetic changes and a subclass of Table
  * :twisted_rightwards_arrows: Refactored LastTakenButton and some cosmetic changes
  * :fountain: Add Log 1 and Log 2 amounts button feature
  * :lipstick: Cosmetic changes
  * :wrench: fixed a minor type :bug: in MedicinePage and OtcPage
  * :zap: Fixed barcode issues and a :bug: in TooltipButton
  * :sunglasses: Fixed the problem with barcodes not showing up correctly
  * :twisted_rightwards_arrows: Convert index.js to index.tsx
  * :star: Change wording in ResidentPage when deleting to 'deactivate'
  * :white_circle: Clean up code in InitialState.tsx
  * Add and fix docblocks
  * :carousel_horse: Work-around for React null handling stupidity
  * :wrench: fixed code in common.js and converted it to common.tsx
  * Tighten up code in MedicineListGroup
  * bwip-js version bump and minor fix to MedicineListGroup
  * Code formatting fixes
  * Tighten up obserer effects in the modals
  * Disable the Save button if the Drug name is empty in the MedicineEdit modal
  * Disable the Save button if Notes are empty in the DrugLogEdit modal
  * Set focus to first name field in the ResidentEdit modal when it is shown
  * Add support for barcodes in search input box
  * Fix OTC Search is valid icon indicator
  * Fix layout problems when there were no medications
  * Tighten some code in MedicinePage
  * Search validation icon logic clean-up
  * Tighten the search useEffect code
  * Handle search matches via useEffect
  * Add docblock to handleMedicineEditModalClose() helper function
  * Refactoring of ManageOtc and ManageDrug pages
  * If enter is pressed on the password textbox then login
  * Add search feature
  * Made sure all MouseEvents had an e.preventDefault()
  * Add PropTypes to remaining components
  * Added PropTypes checking to all pages
  * Convert all functions to arrow functions
  * Fixed an annoying bug where when adding a new resident the medlist wasn't getting cleared
  * Cosmetic fixes and textbox focus feature added
  * Add Manage OTC Page
  * Tightened up some code in MedicinePage and OtcPage
  * A bit of refactoring
  * created a generic TooltipButton replacing the specific AddMedicine button. Also fixed a bug in DrugLogGrid header
  * Removed leftover barcode handling from OtcPage/MedicinePage
  * OtcPage now displays all OTC meds taken in the history
  * Remove setGlobal and use hooks directly instead
  * Convert functions to const
  * Fix problem with OTC meds not showing drug name in DrugHistoryPage
  * Fixed and optimized drugLogList refresh
  * Tweaking things to support OTC -- almost there
  * Removed query and replaced it with search
  * Tightening up code
  * Move Frak() out of the global space
  * remove corrupted InitalState.tsx.sav
  * Save progress
  * Support for OTC
  * Shrink MedicineListGroup in prep for OTC feature.
  * Add DOB to active resident
  * npm package audit fix
  * Fix error when a barcode has no value
  * Merge pull request #43 from RyanNerd/fix-restore-resident
  * Fix medicine log/list not appearing when a resident is restored
  * Merge pull request #42 from RyanNerd/fix-drug-history
  * :bug: Fix drug name not updating on history when edited
  * Merge pull request #41 from RyanNerd/bootstrap-local
  * :sparkles: Make bootstrap.min.css local instead of using a CDN
  * Merge pull request #40 from RyanNerd/organization
  * :sparkles: Organization name now shows when logged in
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * Merge pull request #39 from RyanNerd/embed-barcode-renderer
  * :lock: No longer use the barcode API
  * :lock: Make barcode API call use HTTPS
  * Merge pull request #37 from RyanNerd/typescript-continued-1
  * :art: Merged fix from master that fixes TS errors
  * :art: Fixed the problem with App.tsx throwing TS errors
  * Merge pull request #36 from RyanNerd/resident-color-prod-dev
  * :children_crossing: Resident color changes depending on prod/dev
  * :pencil2: Minor fix to index.js
  * Merge pull request #33 from RyanNerd/fix-delete-med-web-issue-8
  * :bug: Fixed issue where the edit medicine modal would show when deleting a medicine
  * Merge pull request #32 from RyanNerd/fix-refresh-med-list
  * :bug: Remove unneeded and buggy code from RefreshMedicineList
  * :bug: Fix RefreshMedicineList
  * Continued TypeScript conversion
  * Merge pull request #31 from RyanNerd/typescript
  * :art: Start on the path of using TypeScript
  * :package: Updated to use the latest create-react-app
  * :package: Add support for TypeScript
  * Merge pull request #30 from RyanNerd/med-alert
  * :sparkles: Alert message for last time med was taken
  * :art: Fix DocBlocks and remove an unneeded CSS file
  * Update README.md
  * Work-around for weird bug in projection for deleting medicine
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for Deleting a medicine
  * BUGFIX: When adding new resident the medicineList and activeMedicine are cleared
  * RefreshMedicineList now uses search() instead of query() so order_by can be used.
  * Refresh of drug history/log for unTrashed residents and a fix for delete dialog only working once.
  * Added logic to restore inactive residents
  * Merge pull request #25 from RyanNerd/remove-delete-medicine-scan-tab
  * Removed the Delete Medicine button on the MedicinePage
  * Merge pull request #22 from RyanNerd/manage-medicine-barcode
  * Remove subdomain from authentication request
  * Merge pull request #16 from RyanNerd/bacode-refresh
  * Refresh barcode image if the barcode changes
  * Merge pull request #15 from RyanNerd/new-resident-become-active
  * If an existing resident is edited/changed or added make that the ActiveResident
  * Clear barcode when barcode not recognized (after an add or if add is cancelled)
  * Resident DOB for Nov(11) not allowing anything more than 28
  * Add blank EOL to ResidentEdit
  * ResidentGrid columns have LastName FirstName now
  * Fix date verification code
  * Merge remote-tracking branch 'origin/master'
  * Fixed bug when deleting medicine would crash
  * Git ignore the lock files so we don't need to deal with them in production.
  * Added some valdation to ResidentEdit
  * Moved TODO items as issues in Github.
  * Split MediciineListGroup as it's own component to simplify MedicinePage
  * Fixed barcode update issue
  * Added FillDate fields to the MedicineEdit
  * Added barcode and fixed error when no residents exist.
  * Allow deleting medicine
  * Fixed adding new medicine from ManageDrug page
  * Prepped ResidentPage for 'Show Deleted'
  * Fixed a bug when medicine was added on the fly when a barcode is not found
  * Rearranged Medicine edit and delete buttons on Medicine page
  * Removed Chrome Requirement
  * Refactored AddNewMedicineButton into its own component
  * ManageDrugs proof of concept
  * DrugLogGrid layout style changes
  * DrugHistoryPage
  * DrugHistory proof of concept completed
  * Fixed a cosmetic issue in DrugLogGrid as well as updated Reactn in `package.json`
  * MedicineLog now contains ALL history for ALL drugs and is filtered in DrugLogGrid
  * Save progress (proof of concept for window popup)
  * More error handling
  * onError handling via catch() in MedicinePage
  * onError handling
  * Changed text color to blue for Dialog box when a barcode not found
  * Dialog box when a barcode not found
  * DocBlocks for MedicinePage
  * Added delete drug log record feature and fixed a problem when cancelling delete drug.
  * Fixed problem with drug log not updating properly when a new drug was added.
  * Added browserInfo function and moved InitialState.js into the utility directory
  * favicon
  * Use .env to indicate API base url and if development
  * Remove useless code from Frak
  * Small update to the README
  * Update README.md with a better description of this project.
  * ProviderBase preliminary code
  * Document Providers
  * Added logic to delete a Resident
  * Removed the forced uppercase
  * Made drugLogList a global
  * When a resident is selected from the resident list and they have medicine the first one in the list will become the activeDrug
  * Logging of Drugs Modal and POST logic added.
  * Logging of Drugs almost complete
  * Delete functionality, ConfirmationDialog, and InformationDialog components
  * Even more Additional MedicinePage layout changes
  * Additional MedicinePage layout changes
  * MedicinePage layout changes
  * Fix security issue with lodash
  * Preliminary work to get MedicineEdit modal up and running.
  * Some clean up in index.js and index.html
  * Save modal update/save changes.
  * Save modal edit changes.
  * Fix security vulnerability in lodash.
  * Merge pull request #1 from RyanNerd/remove-barcode-as-a-bound-global
  * Make barcode value NOT a global
  * Make barcode value NOT a global
  * Some Refactoring and bug fixes
  * ResidentPage use setGlobal instead of useGlobal for setting state only.
  * Add documentation to LoginPage \ MedicinePage
  * Add documentation to LoginPage \ MedicinePage
  * Fix Linting warnings
  * MedicinePage get barcode and dropdown working again.
  * MedicinePage refactoring
  * LoginPage cosmetic changes
  * Conditional logic for display of drug card
  * Moved quite a bit of logic to MedicinePage
  * Proof of concept for MedicinePage
  * Added Delete (layout only) for Resident List
  * Refactored the Resident Table into it's own component ResidentGrid
  * ResidentEdit modal added
  * Additional features added
  * Build out ScanPage a bit more
  * Save Progress
  * Save Progress
  * ResidentList global populated at login without error this time
  * ResidentList global populated at login
  * Save progress
  * Save progress
  * Save progress
  * Save progress
  * remove .babelrc
  * Initial commit from Create React App

  * 0.10.5
  * Code Cleanup :broom:
  * Improve Client Selection Performance :bullettrain_side:
  * 0.10.4
  * Merge pull request #241 from RyanNerd/239-otc-delete
  * Allow OTC medicine to be deleted :bomb:
  * 0.10.3
  * Merge pull request #238 from RyanNerd/237-modal-improvements
  * Modal Improvements
  * Code Improvements for MedicineEdit
  * 0.10.2
  * Refactored the Checkout All Meds confirm modal
  * 0.10.1
  * Fix :wrench: inactive meds showing up in dropdown
  * 0.10.0
  * Merge pull request #235 from RyanNerd/198-soft-delete-medicine
  * Allow Medication to be Deleted :bomb:
  * Change tsconfig.json to not include comments :notebook: in the output
  * Code Clean Up :broom: `` - Use ` `${variable}` ` instead of string concatination - Moved TooltipContainer.tsx to a Container directory under Pages
  * Fix :wrench: problems found with inspections
  * MedicineDrugPage UI Improvement :lipstick:
  * MedicineEdit UI Improvements :lipstick:
  * UI :lipstick: Improvements for `<Confirm.Modal>`
  * Change how the search text is ClientPage is handled
  * 0.9.8
  * 0.9.7
  * ResidentGrid => ClientGrid Name change
  * Fix :wrench: Med Labels from Client dropdown printing all clients
  * 0.9.6
  * Merge pull request #234 from RyanNerd/224-inactive-meds-in-pillbox-item-grid
  * Fix :wrench: PillboxItemGrid showing inactive meds
  * Merge pull request #233 from RyanNerd/231-deconstruct-props-manage-drug-page
  * ManageDrugPage Improvements :sparkle:
  * 0.9.5
  * Confirm component Enhancement :sparkler:
  * 0.9.4
  * Merge pull request #232 from RyanNerd/227-conslidate-confirms
  * Consolidation of confirm modals
  * 0.9.3
  * Merge pull request #226 from RyanNerd/225-active-field-otc
  * UI change for Manage Rx and Manage OTC
  * Merge pull request #221 from RyanNerd/216-client-object
  * Get confirmation for checkout all if there are exiting checked out meds
  * MedicineEdit Improvements :sparkler:
  * Fixed a :bug: bug where if all medications are inactivated the Med dropdown would be empty showing the last active medication
  * - Changed the name of the `Client` type to `TClient` and moved it into global.d.ts - Added some documentation in RecordTypes.ts
  * Use a Client object that contains all the data for the client
  * Prevent tooltip from showing in printout for checkout all feature
  * Merge branch 'no-toast-printed'
  * 0.9.2
  * Prevent Toasts from showing in printouts
  * 0.9.1
  * Merge pull request #215 from RyanNerd/213-med-dropdown-checkout-indicator
  * UI :lipstick: enhancement for Med Dropdown
  * 0.9.0
  * Tweaking the Checkout All feature UI :lipstick:
  * 0.8.27
  * Remove ; from ManageDrugPage.tsx render
  * Merge pull request #214 from RyanNerd/143-checkout-meds-on-deactivate
  * All Medication Checkout Feature
  * PillPopover Improvements
  * Merge pull request #212 from RyanNerd/211-state-render-med-pb-list-group
  * Fix :wrench: state sync with MedicinePage and PillboxListGroup
  * Fix warnings :warning: in the React console
  * 0.8.26
  * Added `medicineOtcList` constant to MedicinePage
  * Global State moved up for PillboxCard
  * Simplify `gridLists` prop processing
  * 0.8.25
  * Merge pull request #210 from RyanNerd/209-pillbox-log-grid
  * Pillbox components use `gridLists` prop to reduce prop drilling
  * Last of the JSDoc linting rules and fixes :wrench:
  * More JSDoc linting rules and fixes :wrench:
  * 0.8.24
  * JSDoc linting rules and many fixes :wrench:
  * Even More linting settings and fixes
  * 0.8.23
  * More linting settings and fixes
  * Added ``'react-hooks/exhaustive-deps':'error'` to the linter
  * OverlayTrigger has a TS bug :bug: for required attributes, that aren't really required
  * 0.8.22
  * Added some plugins to the linter
  * 0.8.21
  * Merge pull request #206 from RyanNerd/201-show-pillbox-name
  * Show pillbox name in Grids
  * 0.8.20
  * Make it more obvious when in DEV mode
  * 0.8.19
  * Merge pull request #205 from RyanNerd/169-error-boundary
  * Experiment with <ErrorBoundary>
  * Merge pull request #204 from RyanNerd/tslint2eslint-pretty
  * Convert from tslint to eslint and using prettier
  * 0.8.18
  * Make all props in CheckoutGrid required
  * 0.8.17
  * Merge pull request #203 from RyanNerd/202-create-checkout-grid
  * Create CheckoutGrid
  * 0.8.16
  * Added missing hook dependancy
  * 0.8.15
  * Merge pull request #200 from RyanNerd/196-refactor-medlistgroup
  * Pillbox logging and UI Improvements
  * 0.8.14
  * Merge pull request #197 from RyanNerd/195-remove-local-storage
  * Pillbox Remove Local Storage
  * 0.8.13
  * Merge pull request #194 from RyanNerd/pillbox-log-history
  * Pillbox Drug Log History
  * 0.8.12
  * Merge pull request #192 from RyanNerd/190-ui-pillbox-listgroup-improvement
  * Log Pillbox and UI Improvements
  * 0.8.11
  * Only Log Pillbox Items if the medicine is active
  * Add Strength of drug to PillboxListGroup Card
  * History should include inactive drugs
  * 0.8.10
  * Merge pull request #189 from RyanNerd/188-fix-bs
  * BS Color Fix :wrench:
  * Revert "BS Color Fix"
  * BS Color Fix
  * 0.8.9
  * Capitalize Pillbox Name in dropdown
  * Merge pull request #187 from RyanNerd/checkout-badge
  * More Medicine Checkout Improvements
  * Merge pull request #184 from RyanNerd/checkout-badge
  * Add a badge to the Print Checkout buttons
  * Merge pull request #183 from RyanNerd/179-remove-med-checkout-tab
  * Remove Med Checkout Tab
  * Alert pillbox name was not capitalized
  * 0.8.8
  * Merge pull request #181 from RyanNerd/pillbox-ui-improvement
  * Pillbox UI :lipstick: Improvements
  * Merge pull request #180 from RyanNerd/druglog-notes-can-be-null
  * Fix :bug: issue where drugLog.Notes could be null
  * MedicinePage was pitching a fit about importing DrugLogHistory.tsx so this got renamed to MedDrugLogHistory.tsx
  * 0.8.7
  * Merge pull request #178 from RyanNerd/177-credentials-need-alert
  * LoginPage wasn't showing alert with failed credentials :lock:
  * Merge pull request #176 from RyanNerd/simple-ifs
  * Reformat :construction_worker: Code in several modules
  * 0.8.6
  * Merge pull request #175 from RyanNerd/manage-rx-toast
  * Add Toast :bread: to ManageDrugPage
  * 0.8.5
  * Merge pull request #174 from RyanNerd/disabled-spinner-children
  * DisabledSpinner UI :lipstick: Improvements
  * Merge pull request #173 from RyanNerd/med-dropdown-subtext
  * Better UI for other drug names in dropdown
  * Merge pull request #172 from RyanNerd/170-medicine-drop-down-other
  * Display Other Drug Names in dropdown
  * 0.8.4
  * Merge pull request #171 from RyanNerd/code-clean-up
  * Code clean up
  * 0.8.3
  * Fixed About.tsx to allow using X to close
  * 0.8.2
  * removal of PopoverButton.tsx as it is unused
  * Add missing type declarations in reactn
  * Merge pull request #168 from RyanNerd/145-remove-apikeyobserver
  * Simplify the login authentication process
  * Simplify About modal
  * Merge pull request #167 from RyanNerd/163-fix-asyncwrapper-ts-errors
  * Fix :wrench: `asyncwrapper()` typing errors
  * Merge pull request #166 from RyanNerd/print-history-formatting
  * Print History Formatting
  * Merge pull request #165 from RyanNerd/more-ui-changes-pillboxlistgroup
  * Redesign UI :lipstick: PillboxListGroup
  * Merge pull request #164 from RyanNerd/pillbox-ui-change
  * Redesign UI :lipstick: PillboxListGroup
  * Suppress TypeScript errors that suddenly became a problem
  * 0.8.1
  * Removal of the unused MedicineDetails grid
  * Merge pull request #161 from RyanNerd/159-create-otclistgroupgrid
  * Create a grid specifically for OtcListGroup
  * Merge pull request #160 from RyanNerd/157-create-manageotcgrid
  * Create a grid specifically for ManageOtcPage
  * Merge pull request #158 from RyanNerd/147-add-search-manage-otc
  * Add Search :mag: Textbox to Manage Otc Tab
  * Merge pull request #156 from RyanNerd/154-refactor-druglog-grid
  * Refactor Drug History
  * Merge pull request #155 from RyanNerd/152-drug-history-rx-tab
  * Add History Radio Button to Rx tab - Factored out the meat of DrugHistoryPage into DrugHistory.tsx - DrugHistoryPage and MedicinePage use DrugHistory for display of drug log history and print - Added "(OTC)"" to the DrugLogGrid indicating an OTC drug log - Memoized DrugHistoryPage in the LandingPage to reduce re-renders
  * Merge pull request #153 from RyanNerd/149-remove-the-drug-log-table-from-manag
  * Remove Drug Log table from ManageDrugPage
  * Reorganization and Toast own component
  * Merge pull request #151 from RyanNerd/fix-checkout-drug-history
  * Show checkouts in drug log history
  * Merge pull request #150 from RyanNerd/performance
  * Performance :runner: enhancements
  * Performance :runner: enhancement
  * 0.8.0
  * Merge pull request #142 from RyanNerd/pillbox-full-feature
  * UX :bar_chart: Improvement
  * UI :lipstick: improvement
  * Toasts UI :lipstick: improved
  * Limit the DrugLogList to the last 5 days
  * Experimental hook for checking idle
  * - Improved the performance of the pillboxMedLog[] -
  * UI :lipstick: Improvements
  * PillboxListGroup takes children as a prop
  * Pillbox Display
  * PillboxListGroup.tsx changes
  * Code clean up
  * Removal of ClientObserver.ts
  * Removal of the PillboxObserver.ts
  * Removal of the PillboxItemObserver.ts
  * Removal of the DrugLogObserver.ts
  * Code clean up - Remove unneeded `e: React.MouseEvent<HTMLElement>` arguments in MedicineDetail.tsx and components that use it. - Moved the todo: add search box to Manage OTC from comment to an issue - Fixed a bug where even if cancel was chosen do delete an OTC drug the drug would get deleted anyway.
  * Print Medicine Checkout
  * - Change import for react-bootstrap to use direct imports for all components - When the OTC search textbox is cleared the `activeOtc` gets set to null. This was causing visual sync up issues. The search text would be set to an empty string but the selected drug would still be active.
  * Many changes
  * Make multiSort() generic
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * Refactoring
  * Fix :wrench: some UI :bug: bugs
  * More UI :lipstick: on MedicinePage
  * UI :lipstick: Changes
  * Fixing my brain fart
  * Fix :wrench: deleting a drugLog wasn't refreshing the `drugLogList`
  * removed lastTaken as a useState()/useEffect()
  * Removed `drugLogList` from MedicinePage
  * Merge remote-tracking branch 'origin/pillbox-full-feature' into pillbox-full-feature
  * Attempted a refactor of the async DrugLog
  * UI :lipstick: Change to log buttons
  * UI :lipstick: Change to log buttons
  * Significantly Simplified PillboxListGroup
  * Significantly Simplified PillboxListGroup
  * Refactored some pillbox log history functions
  * Partially fix "update" in the MedicineManager.ts
  * Attempt at getting Log Pillbox functionality
  * Show pillbox items in the med dropdown list
  * = Disable the Pillbox radiobutton if `medicineList` has less than 5 items
  * - OtcListGroup search textbox autoFocus - The MedicineDetail grid row will appear in bold if selected
  * Minor code clean up in MedicinePage.tsx
  * Simplified OtcListGroup
  * Flatten and sort all imports
  * - Fixed a missing useEffect dependency in MedicinePage.tsx - Flattened imports   - See: https://dev.to/nilanth/no-more-import-in-react-2mbo
  * Remove `activeClient` global
  * Manage activeMed state better when adding med
  * Keep state of activeMed when drugs are logged
  * :broom: Clean up code
  * Move all PillboxPage.tsx into PillboxListGroup.tsx - Moved the logic from PillboxPage as a landing page item instead making it a ListGroup item - Fixed a bug in `getPillboxItemS()` where the filter wasn't including the `pillboxId` - Removed the PillboxPage from the LandingPage - Added PillboxCard.tsx as a more feature rich PillboxItemGrid - MedicinePage.tsx updated to use PillboxListGroup new features and PillboxCard - PillboxItemGrid.tsx :building_construction:  scaffolding added for click on row functionality - PillboxListGroup.tsx placeholder replaced with actual logic and features :atom_symbol: - Destroyed :bomb: PillboxPage.tsx - Destroyed :bomb: MedicineListGroup.tsx
  * - Set initial state of `activeMed`, `activeOtc` & `activePillbox` by using `usePrevious()` hook. - Changed `LIST_TYPE` to `DISPLAY_TYPE` and added a Print to the enum. - Removal of the `<Collapse>` component in OtcListGroup.tsx - Conditional rendering fixed and updated in MedListGroup.tsx - LandingPage.tsx documentation updated
  * Moved state back down to components in LandingPage
  * Major :ringed_planet: :construction_worker: Overhaul of MedicinePage - MedicinePage can now be in one of three states:   1. Medicine - select and log prescriptions   2. OTC - Select and log OTC drugs   3. Pillbox - Select a pill box and log drugs therein - Complete UI :lipstick: redesign for MedicinePage.tsx - MedListGroup changed to **only** handle prescriptions (was handling pillbox and drugs -- needed separation of concerns) - Removed Show/Hide OTC buttons in OtcListGroup - Added PillboxListGroup.tsx - Added radio buttons Medicine, OTC, and Pillbox to let user set state. - OtcList global moved to LandingPage.tsx and passed into MedicinePage.tsx
  * - Minor code clean-up in About.tsx - ActiveResidentObserver.ts uses the `usePrevious()` hook now. - ApiKeyObserver.ts uses `asyncWrapper()` for better error control. - Minor code clean-up in ConfirmDialogModal.tsx - Very minor code clean-up in ErrorDetailsObserver.ts (removed a space) - Added function getPillboxItems.ts so MedicinePage.tsx and PillboxPage.tsx can share code. - Added `IPillboxItemObserver` interface to global.d.ts - Some code clean-up for LandingPage.tsx as well as some todos. Also `<PillboxPage>`` takes additional attributes passed in from LandingPage. - Minor code clean-up in MedDropdown.tsx - Added `<PillboxItemGrid>` to be displayed when the selected activeId is a pillbox. - Code clean-up for MedListGroup.tsx  - `<TooltipButton>` replaced with a standard `<Button>`  - Removed `tooltipText()` since it was displaying with the `<ToolTipButton>` anyway  - Added a + Log ALL Drugs in Pillbox button (not currently functional - PillboxItemGrid.tsx uses getPillboxItems.ts to build out the `PillRows. Some code clean-up. - Code clean-up in PillboxItemObserver.ts - PillboxPage.tsx   - Added props refresh for `pillboxItemList`, `pillboxList`, and `activePillbox`   - Use `getPillboxItems()` to fetch `PillboxItemRows` - Added a `usePrevious()` hook.
  * - Continued the overhaul of MedicinePage.tsx to use MedListGroup.tsx and support pillboxes. activeId is used instead of activeDrug. - Moved state from MedDropdown.tsx for the buildout of the listItems to MedListGroup.tsx. This solved a bunch of issues. - Removed the `medicineList` and `pillboxList` from MedDropdown.tsx replacing them with an `itemList` prop that comes from the MedListGroup.tsx solving a bunch of issues.
  * - Added `React.StrictMode` to all things ` <LandingPage>` :small_airplane: - Moving state up to the LandingPage.tsx for global lists. - Starting on the major revamp of MedicinePage.tsx so that it can support Pillboxes - MedListGroup.tsx created to replace MedicineListGroup.tsx - MedDropdown.tsx replaces MedicineDropdown.tsx - Minor :lipstick: cosmetic changes to PillboxEdit.tsx - Minor :lipstick: changes in PillboxPage.tsx
  * - :lipstick: Code Formatting
  * - :lipstick: UI formatting for the `TabPane` in PillboxPage.tsx   - The `Card.Title` now has a formatted pillbox name that looks similar to the selected `Nav` item.   - Added some text to help users know how to determine what is in the selected pillbox - Added Bootstrap color enumerator `BsColor` to common.ts - Both PillboxPage.tsx and PillboxItemGrid.tsx use `BsColor` enum
  * - Quantity selection in PillboxItemGrid.tsx is now a dropdown split button - Scaffolding set up for `onEdit()` handling in PillboxPage.tsx
  * - Significantly changed how PillboxItemGrid.tsx works by:    - sorting on Quantity, Drug    - Removed :boom: delete button    - Added small buttons of + qty    - All medicines for the client are displayed in the grid - PillboxPage.tsx changed to handle the new signature of PillboxItemGrid.tsx - Added _multiSort()_ function in common.ts to handle multiple column sorting.
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature - Got default pillbox and tab content to work via `active` attribute - Added a really important field to `PillboxItemRecord` (MedicineId was missing) - PillboxItemObserver.ts removal of `console.log()` diagnostic - PillboxItemGrid.tsx component added - Removal of unused imports in PillboxEdit.tsx - Moved state for PillboxPage up to the LandingPage.tsx
  * Update README.md and LICENSE.txt
  * Pillbox Feature
  * Pillbox Feature
  * 0.7.2
  * Merge pull request #141 from RyanNerd/manage-rx-row-size
  * UI :lipstick: fix :wrench: for ManageRx tab
  * 0.7.1
  * Fix a regression :bug: in MedicineEdit.tsx
  * Merge pull request #139 from RyanNerd/active-switch
  * 0.7.0
  * Medicine Active checkbox and Other drug names
  * 0.6.1
  * - When coping a the client name to the clipboard use the format FirstName LastName (was Lastname, FirstName) - Spelling fix in DiagnosticPage.tsx
  * Merge pull request #136 from RyanNerd/pillbox
  * 0.6.0
  * Search criteria signature change
  * Search criteria signature change
  * Dependency version & Diagnostics
  * Merge pull request #133 from RyanNerd/client-dropdown-minor-change
  * 0.5.1
  * Client dropdown addition
  * Version bump
  * Merge pull request #132 from RyanNerd/108-force-print-dialog-when-a-new-client
  * When adding new client show print dialog
  * Merge pull request #131 from RyanNerd/129-when-the-system-crashes-the-client-n
  * When ErrorDetails displayed unset ActiveResident
  * Fix a minor spelling error in code comments
  * Merge pull request #130 from RyanNerd/124-change-how-name-button-popover-works
  * Revamp the client name and DOB buttons
  * [WIP] Revamp the client name and DOB buttons
  * Merge pull request #128 from RyanNerd/121-notes-and-directions-for-packs-
  * For DrugHistory use a combo of Notes & Directions
  * Chage link text in About.tsx for issues - Closes #125
  * Updated the docblock for `clientFullName()` in common.ts
  * Merge pull request #127 from RyanNerd/nick-name
  * Nickname added to client / resident
  * Merge pull request #120 from RyanNerd/119-validate-client-dob-is-not-in-the-fu
  * Prevent DOB set in future
  * Merge pull request #118 from RyanNerd/112-medicineedit-fill-date-validation-
  * Prevent future Fill Date when editing Medicine
  * Merge pull request #117 from RyanNerd/109-change-isdayvalid-ismonthvalid-and-i
  * isYear, isDay, and isMonth Valid signature change
  * 0.4.5
  * npm run build exports memory limit before running
  * Small update to README.md
  * Merge pull request #116 from RyanNerd/115-clicking-on-client-dob-button-should
  * Launch edit modal for active client when DOB button clicked
  * Merge pull request #114 from RyanNerd/110-figure-out-why-the-medicineedit-moda
  * Fix 🔧 display issue with MedicineEdit.tsx
  * Merge pull request #113 from RyanNerd/tweak-fill-date-validation
  * Medicine Fill Date 📅 validation 👮
  * Merge pull request #111 from RyanNerd/fix-fill-date
  * Add Fill Date validation 👮
  * Merge pull request #107 from RyanNerd/quack-quack-die
  * Remove 🦆 typing from ManageDrugPage.tsx
  * Merge pull request #106 from RyanNerd/druglog-edit-validation
  * - Consolidated `getDrugName()` in common.ts - Code clean-up 🧹
  * [WIP] Don't show Out or In fields in DrugLogEdit if OTC
  * Removed a todo that was done
  * Merge pull request #101 from RyanNerd/spinner-observer
  * Add spinner to indcate when system is busy
  * Add spinner 🎡 to Medicine Dropdown when disabled
  * Merge pull request #100 from RyanNerd/observer-finally
  * Use `finally()` in observer promises
  * Delay before invoking print dialog for ClientRoster
  * LoginPage 👷 Rework
  * 0.4.4
  * Merge pull request #99 from RyanNerd/login-flair
  * LoginPage 👷 Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage 👷 Rework
  * Clean-up 🧹 code and documentation
  * Version Modal Additions
  * 0.4.3
  * Determine the version via npm env
  * 0.4.2
  * Merge pull request #98 from RyanNerd/revamp-otc
  * Revamp 💄 👷 OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp 👷 the OTC ListGroup
  * 0.4.1
  * Merge pull request #97 from RyanNerd/fix-dupe-client-issue
  * Fix  Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * 0.4.0
  * Merge pull request #96 from RyanNerd/client-notes
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * 0.3.18
  * Fix 🔧 + OTC and Edit OTC buttons from bleeding through
  * Merge pull request #95 from RyanNerd/version-update
  * Version updates in package.json
  * Add useStickyState hook for possible future use
  * More code changes to TooltipButton
  * Fix missing required attributes in TooltipButton
  * Get rid of the useless @constructor in JSDOC headers
  * Get rid of the useless @constructor JSDOC
  * Merge pull request #94 from RyanNerd/about-page
  * 0.3.17
  * Add About Modal
  * Merge pull request #93 from RyanNerd/client-name
  * 0.3.16
  * Client name and DOB headers are separate buttons
  * Merge pull request #92 from RyanNerd/fix-client-name-update
  * 0.3.15
  * Fix 🔧 ActiveResident global not getting updated when client info updated
  * Merge pull request #91 from RyanNerd/client-printout
  * 0.3.14
  * Add Feature to Print Client Roster
  * 0.3.13
  * Merge pull request #90 from RyanNerd/client-roster
  * Add Feature to Print Client Roster
  * Merge pull request #89 from RyanNerd/fix-drug-log-edit
  * 0.3.12
  * 🔧 Fixed DrugLogEdit
  * Merge pull request #88 from RyanNerd/bulk-med-checkout
  * 🔧 Fixed Print Medicine Checkout in Manage Rx tab
  * Merge pull request #87 from RyanNerd/bulk-med-checkout
  * 0.3.11
  * Log Drug from Manage Rx tab
  * 💄Log Drug from Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * Date.toLocaleString() TS fix
  * Merge pull request #86 from RyanNerd/otc-in-rx-page
  * 0.3.10
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and medical logging
  * Merge pull request #82 from RyanNerd/show-client-print
  * Add client name and DOB to DrugHistoryPage print area
  * 0.3.9
  * Merge pull request #81 from RyanNerd/get-version-from-package.json
  * Use package.json to obtain version
  * Merge pull request #80 from RyanNerd/fix-print-margins
  * Fix print margins
  * Merge pull request #79 from RyanNerd/fix-drug-history-print
  * Allow the printing of the client name in DrugHistoryPage
  * Bumped up RxChart version in package.json
  * Added Out and In columns to MedicinePage drug log grid
  * Merge pull request #78 from RyanNerd/no-print
  * Print MedicineCheckout Enhancements and 🔧 Fixes
  * Merge pull request #77 from RyanNerd/dependancy-version-update
  * Upgrade ⬆ dependency versions
  * Merge pull request #76 from RyanNerd/disable-login-field-empty
  * Disable Login button if password or username are empty 🗑
  * Merge pull request #75 from RyanNerd/base-url-error-message
  * Display error message if .env is missing or BASEURL isn't set
  * Bumped the version in package.json
  * 💊 Medicine Checkout Feature
  * Merge pull request #74 from RyanNerd/medicine-checkout-feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💥 Remove `<any>` type
  * ♻ Refactor Validation 👮 code into its own 📁
  * 🔧 Fix `drawBarcode()` to verify the canvas element exists before trying to draw the barcode
  * 💊 OtcPage.tsx
  * 💊 MedicinePage
  * 💊 MedicinePage
  * 💊 MedicinePage 🐛 fix
  * 🔨 Fix pressing enter in search textbox causes app to reset.
  * 🔧 Fix NPM dependency ➕
  * Revert tsconfig.json
  * tsconfig.json is pitching a 😠 fit
  * Removed the development 🙈 requirement for the DiagnosticPage.tsx
  * Merge pull request #73 from RyanNerd/disable-log-buttons
  * 🎇 Added disable feature to the log buttons
  * ⬆ Upgraded dependencies
  * 0.3.5
  * 0.3.4
  * Merge pull request #72 from RyanNerd/fix-scroll-to-modal
  * Removed scrollTop feature from all tab pages
  * Merge pull request #71 from RyanNerd/prevent-client-dupe
  * ResidentManager fixed 🔧 to prevent dupes
  * ♻ setApi() changed to emit a promise - Loading of client records, OTC records now only happens AFTER the apiKey is set for ALL providers. - Discourse on the Observer middleware architecture is exhastively commented in App.tsx
  * Consolidation 🧑‍🤝‍🧑 of the AuthObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the OtcMedicineObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the DrugLogObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the MedicineObserver 🔭
  * Merge pull request #70 from RyanNerd/observer-consolidation-client
  * Consolidation 🧑‍🤝‍🧑 of the ClientObserver 🔭
  * Added `logout` as a global 🌎 hook 🎣
  * 💄UI Improvements in MedicinePage
  * :boom: removed `console.log()` from UpdateClientObserver.ts
  * ♻ When a new client is added make that client active
  * 💥 Removal of Search box from MedicinePage
  * Merge pull request #69 from RyanNerd/code-reformatting
  * - 💄Code formatting for multiple modules
  * - 💄JSDoc  and code formatting changes
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * Merge pull request #67 from RyanNerd/otcpage-using-table
  * 💄 UI for OtcPage changed to list 📜 OTC drugs in a table
  * Fix 🔧 a minor linting problem
  * Add Search 🔍 Validation
  * ♻ Refactored <LogButtons> into its own component
  * Added Log button stack to the ListGroup
  * 🚘 In progress - OtcPage using table instead of MedicineListGroup
  * 💄 Changed Tab order in LandingPage.tsx
  * Merge pull request #66 from RyanNerd/hooks-4-updates
  * OtcPage now uses declarative hooks 🎣 for updates and delete processing
  * 💄A little bit of code clean-up 🧹
  * A couple of hooks 🎣 added for OTC
  * 💄Code formatting and adding better comment 💬 headers
  * ♻ Refactoring
  * `login` is now a global 🌎 hook 🎣 that is set to the `{username, password}` when a user logs in.
  * `refreshOtc` is now a hook 🎣 trigger 🔫 for when the otcList needs to be refreshed.
  * - `deleteMedicine` is now a hook 🎣 trigger 🔫 for when a MedicineRecord is to be deleted. - 💄Reorganized the code in App.tsx
  * - `deleteDrugLog` is now a hook 🎣 trigger 🔫 for when a DrugLogRecord is to be deleted. - Fixed a 🐛 in the DiagnosticPage where `CloseErrorButton` wasn't inside the `useMemo()` - Changed MedicineManger, MedicinePage, and OtcPage with how it handles deletes in prep for the next salvo of changes.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Merge remote-tracking branch 'origin/hooks-4-updates' into hooks-4-updates
  * 🎣 App.tsx is the single source of truth via hooks 🔧 Fixed a problem when the medicine dropdown changes the selection would revert back to the original value.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 💄Code format changes
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Add ShadowBox 🔲 to Directions in MedicineListGroup - Just for flare's 🌈 sake
  * Merge pull request #65 from RyanNerd/toggle-switch
  * Merge pull request #64 from RyanNerd/shadow-box
  * Add ShadowBox 🔲
  * Add ToggleSwitch 💡
  * 🔧 Fixed the double underline for the medicine link ⛓
  * 💄Add link ⛓ on MedicinePage for drugs 💊 - Added some flair 🌈 to the link via CSS - Link uses [GoodRx](https://goodrx.com)
  * Merge pull request #63 from RyanNerd/react-upgrade-workaround
  * 🔧 Work-around a 🐛 with ⚛ React 17 and DropdownButton - See: https://github.com/react-bootstrap/react-bootstrap/issues/5409 - The work around is here: https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584 - package.json was changed to bring in React ⚛ v17.0.1
  * Add support for Willow 🌳 API error handling - ♻ Refactored DiagnosticPage by adding <CloseErrorButton> reusable component - 🌳 Willow API error parsing added to DiagnosticPage.tsx
  * ♻ Refactoring to import using reactn when possible
  * Merge pull request #62 from RyanNerd/error-state-logout
  * Disable Login page when there is an error
  * 🥅 DiagnosticPage now resets correctly when dismissed - Changed order of operations with LoginPage when testing errors. - Changed LandingPage handling `dismissErrorAlert()` to set global state back to initial values.
  * 🎨 Change activeTabKey state to be string only
  * 💄Added Log 3 & log 4 buttons - Buttons added to MedicineListGroup, MedicinePage, and OtcPage - Added scroll to top for all pages when that page becomes active (except for the LandingPage as that page is always active whem the app starts)
  * Add 📜 Scroll-to-top logic in the ResidentPage when it becomes active
  * 💄When a resident is selected reset the search textbox to an empty string. After a resident is selected when the user returns to the ResidentPage tab typically they are looking to select a different resident or add one and reseting the search textbox to empty string shows the entire resident list.
  * 💄More code formatting in ResidentPage
  * 💄Code formatting 🔨 fix in ResidentPage
  * Merge pull request #61 from RyanNerd/resident-search
  * Add a search 🔍 filter to ResidentPage
  * 🐟 Upstream merge from master
  * 💄Make the Medicine tab title Rx
  * Add search 🔎 to ResidentPage
  * 💄Make all modals backdrop = ⚡static⚡ Modals can no longer be dismissed by clicking off the modal.
  * Added missing `ResidentId` to DrugLogRecord
  * 💄 ResidentGrid now shows Created and Activated columns as formatted dates
  * 📜 Scroll to the top of the page when MedicinePage is active
  * 🔥Removal of no-namespace rule in tslint.json The previous merge allows this rule to be reestablished as the default
  * Merge pull request #60 from RyanNerd/bwip-js-update
  * 🔥Removal of bwip-js.d.js the 👽📦 updated
  * :rotating_light: Added `tslint-react-hooks` to the linter
  * ♻ Refactored ✈LandingPage and  ⚕DrugHistoryPage ⚕DrugHistoryPage now uses globals instead of props Single responsiblity.
  * ✈ LandingPage uses CSS to bold active tabs This used to be done via a function.
  * 💄Cosmetic changes to LandingPage
  * Merge pull request #59 from RyanNerd/active-tab-key
  * ⚡ Improve performance by only rendering tab content when that tab is active Added the prop `activeTabKey` to a number of Pages and put conditional logic in place to prevent render when that tab isn't the active tab.
  * Minor code format 🔨 fix
  * ♻ Refactor MedicinePage, OtcPage, and DrugLogGrid - Make `getObjectByProperty()` generic - Move `getDrugName()` to common.ts for refactoring.
  * 💡Updated DocBlocks to be more concise Also removed 🔥 unneeded `: void` return types
  * Minor change when adding new resident auto switch to Rx tab
  * Changed `calculateLastTaken` to use Created date instead of Updated.
  * Merge pull request #58 from RyanNerd/api-set-change
  * 🔧 Fixed a problem with the DropDown button The dropdown button would stop working after a modal was opened. After a 🌦 day of pulling my 🦱 out trying to figure out what had happened. Finally found this: https://github.com/react-bootstrap/react-bootstrap/issues/5409 Had to thunk React back down to 16.14.0
  * Changed how APIs get set in the providers
  * Merge pull request #57 from RyanNerd/external-package-upgrades
  * Updated several 📦 packages to the latest version bootstrap.min.css was removed 🔥 from the public folder and the stylesheet link in index.html was also removed index.tsx now imports bootstrap.min.css using the NPM package The following 📦 packages were upgraded: - React ⚛ - bootstrap 💄 - bwup-js - typescript 📜 One package was removed: - react-new-window
  * Merge pull request #56 from RyanNerd/frak-upgrade
  * Update Frak to latest version and 🔧 fix Providers - 👽 Frak package is no longer an object but is now a function. All providers changed accordingly. - Error 🐛 handling was updated in DiagnosticPage since Frak no longer emits a custom error, but ⚾ throws the Response as an error when there is an exception.
  * Merge pull request #55 from RyanNerd/gotta-catch-em-all
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Automatically activate ⚡ the Rx (medicine) when a resident is selected
  * Added a dismiss 🔥 option for `_alert()` allowing users to log back in. Also 🚛 moved `_alert()` into `useMemo()`
  * Add 📃 JSDoc blocks to DiagnosticPage.tsx Also added some additional 🦆 type checking logic
  * Merge pull request #54 from RyanNerd/diagnostics-retool
  * Retooling 🔧 of DiagnosticPage.tsx
  * Merge pull request #53 from RyanNerd/global-error-handling
  * :bug: Error handling is now done via a 🌎 global called `errorDetail` All components in the Page directory no loger call `onError()` but instead now use `errorDetails()` Moved the observer that hides the Diagnostic tab to the DiagnosticPage.tsx 💄Improved the code in DiagnosticPage.tsx to better display errors depending on the type of error. The error prop that DiagnosticPage.tsx receives is of the type `any` so some 🦆 typing logic was added. global.d.ts and getInitialState.ts were 🔝 updated to handle the new global `errorDetail` TODO: Make the DiagnosticPage.tsx use an accordion component when showing details. This will be a future task.
  * ✨ Added code in LandingPage to more cleanly set the tab titles and bold the tab that is active.
  * Merge pull request #52 from RyanNerd/auth-manager
  * ♻ Refactor Providers and establish AuthManager 🗑 Removed ProviderTypes.ts moving the type definitions to the individual providers ✨ Created AuthManager to be consistant with design
  * ResidentPage code clean-up 💄 🗑 Removed `refreshDrugs()` since it was only being called from one place and refactored ♻ the code into the orginal caller.
  * 🔧 Fix ResidentPage which had a recursive 🐛 🗑 Removed the `useEffect()` and replaced it with `refreshDrugs()` upon edit/add/select/delete operations
  * ♻ Refactored all the .tsx files in the Pages directory to the components directory
  * Merge pull request #51 from RyanNerd/autoload-lists
  * Handle resident changes via useEffect to reload 🔃 residentList, medicineList, and drugLogLists ♻ Refactored ResidentManager eliminating 🗑 the complexity
  * Merge pull request #50 from RyanNerd/medicine-manager
  * ♻ Refactored ManageDrugPage, ManageOtcPage, and OtcPage to use the :sparkles: new MedicineManager.ts
  * ♻ Refactored MedicinePage to use :sparkles: new MedicineManager.ts
  * Merge pull request #49 from RyanNerd/current-resident
  * 💄Cosmetic code changes and made providers more logical ♻ Refactored the Providers to take baseUrl as an argument 🗑 Removed baseUrl from the globals
  * ✨ Major ♻ refactoring for Resident bussiness logic  Moved all business logic to a ResidentManager module.
  * More 🚲 Bikeshedding cosmetic 💄 code changes to multiple modules
  * 🚲 Bikeshedding some 💄 cosmetic code changes to MedicineListGroup
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to ResidentGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to MedicineDetail
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to DrugLogGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to TooltipButton
  * :sparkler: Added AuthenticationProvider
  * :rocket: Major revision to providers making them type safe :closed_lock_with_key:
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to OtcPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to ManageOtcPage
  * :lipstick: Cosmetic code changes to MedicinePage
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to ResidentPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: cosmetic code changes  uses global State as an interface
  * :lipstick: cosmetic code changes in
  * :lipstick: cosmetic code changes defaulting to empty arrays for lists instead of null
  * :scroll: Typing and :lipstick: cosmetic code changes to DrugLogGrid and DrugHistoryPage
  * :lipstick: Cosmetic code changes including an .editorconfig file to enforce style
  * More :lipstick: Cosmetic changes to the code (indentation and other)
  * :lipstick: Cosmetic changes to the code (indentation and others)
  * :sunglasses: Simplfy the providers even more
  * Further reduce the warning noise :loud_sound: in the console log by :wrench: fixing the show prop to be bool
  * Eliminate the warning noise :loud_sound: in the console log by changing onAnswer to onSelect
  * :sunglasses: Simplify all providers to use Frak directly
  * Merge pull request #48 from RyanNerd/frak-npm
  * Use Frak from the NPM :package:
  * :arrow_heading_up: Update React to 16.14.0 and add lint rules for code line length and :wrench: fix modules that violated the new rule.
  * Added tslinter :heavy_check_mark: and updated all code
  * :wrench: Fix code indentation in ResidentGrid
  * :wrench: Fix code indentation in MedicineDetail
  * :sunglasses: Simplify DrugLogGrid
  * :tractor: Moved  into  and some :scroll: typing changes
  * :scroll: Type code changes in common
  * :sunny: Clean up code for the  function
  * tractor: Moved  to common
  * useForceUpdate deleted :wastebasket: as it was not being used. :scroll: Types extended for TooltipButton
  * :wrench: Fix :scroll: typings in MedicineListGroup for logDrug callback
  * :wrench: Fix :scroll: typings in MedicineListGroup for barcode canvas
  * :wrench: Fix :scroll: typings in MedicineListGroup and OtcPage
  * :wrench: Fix the typings in DrugDropdown and MedicineListGroup
  * :lipstick: Make IProps interface definiton more specific in ResidentGrid
  * :lipstick: Center text for Selected column in ResidentGrid
  * :lipstick: Add Reload button in ResidentPage and :wrench: tighten up code
  * :wrench: Fix ResidentPage to use TooltipButton
  * :lipstick: Remove condenced class from the Resident table
  * Code format :lipstick: changes in Frak
  * :sunglasses: Simplify LastTakenButton
  * :lipstick Don't display the LastTakenButton if the lastTaken value is null
  * :wrench: Fix the display :lipstick: of Last Taken (hours)
  * :wrench: Fixed :lipstick: formatting in DrugLogGrid for Drug and Created rows
  * :sunglasses: Simplify bolding in ResidentGrid and DrugLogGrid
  * :lipstick: Made selected resident row bold. :wrench: fixed the drug log grid to show in bold when drug logged today
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :star2: Add missing Doc-Blocks and :wrench: fix a bug in ResidentPage where medicine logs weren't loading
  * :lipstick: Cosmetic changes to Fill Date display
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in MedicinePage
  * :wrench: Fixed error handling in MedHistoryProvider
  * :wrench: Fixed error handling in MedicineProvider
  * :wrench: Fixed error handling in ResidentProvider
  * :wrench: Error handling and added DiagnosticPage to display errors
  * :twisted_rightwards_arrows: Refactor ResidentPage and fix a :bug: in ResidentProvider
  * :wrench: Tightened up code in ResidentPage
  * :lipstick: Make mouse cursor default when the Log 1 / Log 2 buttons are disabled
  * :eight_spoked_asterisk: More changes to the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :eight_spoked_asterisk: Change the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :arrow_heading_up: Upgraded bootstrap.min.css to latest version 4.4.1
  * :rainbow: Changed the color scheme of the DrugLogGrid based on lastTaken
  * :sunglasses: Simplify the LastTakeButton (remove unused props)
  * :cyclone: Major code clean-up
  * :twisted_rightwards_arrows: Refactor DrugLogGrid to use getObjectByProperty()
  * :lipstick: Show drug name in Delete confirmation dialog for OtcPage and MedicinePage
  * :twisted_rightwards_arrows: Refactor deleteDrugLog
  * :sunglasses: Make MedicineDetail a component with props
  * :sunglasses: Make DrugLogGrid more generic
  * :fire: Remove RxTable and use the Table component instead for simplicity :sunglasses:
  * :sunglasses: Make the MedicineDetail more generic
  * :lipstick: Costmetic change make last taken variant color consistant
  * :twisted_rightwards_arrows: More ResidentPage simplification
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :lipstick: Cosmetic change for Delete confirm in ManageOtcPage
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * Fix a :bug: in Confirm and have ManageDrugPage use the new component
  * Create Confirm in the Modals directory as a better more generic ConfirmationDialog
  * Make the ConfirmationDialog more generic :older_man:
  * Add a more prominant warning :warning: when an OTC drug will be deleted
  * Merge pull request #47 from RyanNerd/react-bootstrap-typescript
  * Cosmetic :lipstick: changes to all the tab titles making them bold when active
  * Minor cosmetic :lipstick: code changes
  * :twisted_rightwards_arrows: For consistancy refactor getResidentList
  * :twisted_rightwards_arrows: Refactor remaining refreshList into getLists
  * :twisted_rightwards_arrows: Refactor RefreshMedicineList into getMedicineList
  * Added a :warning: when OTC meds are edited that the change will be for all
  * :twisted_rightwards_arrows: Refactor of ManageOtc, ManageRx, OtcPage, and MedicinePage
  * :beginner: Simplify addEditDrugLog in Medicine and Otc Pages
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage for logging drugs
  * Refactoring of page to Pages
  * :bowtie: Add Log 2 button to MedicineListGroup & fixed a :bug: in OtcPage
  * :bowtie: change layout of OtcPage to better accomidate the drug history grid
  * fix a :bug: with the error handler. Also hide the Diagnostics tab completely when not active
  * :part_alternation_mark: Change how field setFocus works
  * :scroll: TypeScript conversion even more typings and fix an OTC delete bug
  * :scroll: TypeScript conversion even more typings
  * :scroll: TypeScript conversion ResidentProvider typings
  * :scroll: TypeScript conversion ResidentPage fix :bug: DrugLog refresh
  * :scroll: TypeScript conversion ResidentPage typings
  * :scroll: TypeScript conversion More MedicineProvider typings
  * :scroll: TypeScript conversion MedicineProvider typings
  * :scroll: TypeScript clean-up of Frak and elimination of FrakTypes
  * :scroll: Major TypeScript / object conversion for Frak
  * :scroll: TypeScript / object conversion for Frak
  * :scroll: TypeScript conversion Frak
  * :scroll: TypeScript conversion add useProviders() hook
  * :scroll: TypeScript conversion tighten up more code
  * :scroll: TypeScript conversion tighten up code
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for MedicinePage
  * :scroll: TypeScript conversion for ManageOtcPage
  * :scroll: TypeScript conversion for ManageDrugPage
  * :scroll: TypeScript conversion for LoginPage
  * :scroll: TypeScript conversion for RefreshMedicineLog
  * :twisted_rightwards_arrows: Refactor of Provider helpers
  * :scroll: TypeScript conversion for RefreshOtcList
  * :scroll: TypeScript conversion for DeleteMedicine
  * :scroll: TypeScript conversion for RefreshMedicineList
  * :scroll: TypeScript conversion for ResidentProvider
  * :scroll: TypeScript conversion for MedicineProvider
  * :scroll: TypeScript conversion for DrugHistoryPage
  * :scroll: TypeScript conversion for ResidentEdit
  * :scroll: TypeScript conversion for MedicineEdit
  * :scroll: TypeScript conversion :bug: fix for DrugLogEdit
  * :scroll: TypeScript conversion for DrugLogEdit
  * :scroll: TypeScript conversion Fix :wrench: up for ConfirmationDialog
  * :scroll: TypeScript conversion Remove InformationDialog
  * :scroll: TypeScript conversion ConfirmationDialog
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion DrugDropdown
  * :scroll: TypeScript conversion MedicineDetail
  * :scroll: TypeScript conversion DrugLogGrid
  * :scroll: TypeScript conversion ResidentGrid
  * :scroll: TypeScript conversion RxTable
  * :scroll: TypeScript conversion LastTakenButton
  * :scroll: TypeScript conversion for React Bootstrap
  * :curly_loop: Yet even more TypeScript conversions
  * :curly_loop: Even more TypeScript conversions
  * :curly_loop: More TypeScript conversions
  * :curly_loop: Minor TypeScript conversions
  * Merge pull request #46 from RyanNerd/medicine-otc-page-refactor
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage
  * Merge pull request #45 from RyanNerd/otc-feature
  * :lipstick: Even more cosmetic changes & fix to attribute={true} making React mad
  * :lipstick: More cosmetic changes and a subclass of Table
  * :twisted_rightwards_arrows: Refactored LastTakenButton and some cosmetic changes
  * :fountain: Add Log 1 and Log 2 amounts button feature
  * :lipstick: Cosmetic changes
  * :wrench: fixed a minor type :bug: in MedicinePage and OtcPage
  * :zap: Fixed barcode issues and a :bug: in TooltipButton
  * :sunglasses: Fixed the problem with barcodes not showing up correctly
  * :twisted_rightwards_arrows: Convert index.js to index.tsx
  * :star: Change wording in ResidentPage when deleting to 'deactivate'
  * :white_circle: Clean up code in InitialState.tsx
  * Add and fix docblocks
  * :carousel_horse: Work-around for React null handling stupidity
  * :wrench: fixed code in common.js and converted it to common.tsx
  * Tighten up code in MedicineListGroup
  * bwip-js version bump and minor fix to MedicineListGroup
  * Code formatting fixes
  * Tighten up obserer effects in the modals
  * Disable the Save button if the Drug name is empty in the MedicineEdit modal
  * Disable the Save button if Notes are empty in the DrugLogEdit modal
  * Set focus to first name field in the ResidentEdit modal when it is shown
  * Add support for barcodes in search input box
  * Fix OTC Search is valid icon indicator
  * Fix layout problems when there were no medications
  * Tighten some code in MedicinePage
  * Search validation icon logic clean-up
  * Tighten the search useEffect code
  * Handle search matches via useEffect
  * Add docblock to handleMedicineEditModalClose() helper function
  * Refactoring of ManageOtc and ManageDrug pages
  * If enter is pressed on the password textbox then login
  * Add search feature
  * Made sure all MouseEvents had an e.preventDefault()
  * Add PropTypes to remaining components
  * Added PropTypes checking to all pages
  * Convert all functions to arrow functions
  * Fixed an annoying bug where when adding a new resident the medlist wasn't getting cleared
  * Cosmetic fixes and textbox focus feature added
  * Add Manage OTC Page
  * Tightened up some code in MedicinePage and OtcPage
  * A bit of refactoring
  * created a generic TooltipButton replacing the specific AddMedicine button. Also fixed a bug in DrugLogGrid header
  * Removed leftover barcode handling from OtcPage/MedicinePage
  * OtcPage now displays all OTC meds taken in the history
  * Remove setGlobal and use hooks directly instead
  * Convert functions to const
  * Fix problem with OTC meds not showing drug name in DrugHistoryPage
  * Fixed and optimized drugLogList refresh
  * Tweaking things to support OTC -- almost there
  * Removed query and replaced it with search
  * Tightening up code
  * Move Frak() out of the global space
  * remove corrupted InitalState.tsx.sav
  * Save progress
  * Support for OTC
  * Shrink MedicineListGroup in prep for OTC feature.
  * Add DOB to active resident
  * npm package audit fix
  * Fix error when a barcode has no value
  * Merge pull request #43 from RyanNerd/fix-restore-resident
  * Fix medicine log/list not appearing when a resident is restored
  * Merge pull request #42 from RyanNerd/fix-drug-history
  * :bug: Fix drug name not updating on history when edited
  * Merge pull request #41 from RyanNerd/bootstrap-local
  * :sparkles: Make bootstrap.min.css local instead of using a CDN
  * Merge pull request #40 from RyanNerd/organization
  * :sparkles: Organization name now shows when logged in
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * Merge pull request #39 from RyanNerd/embed-barcode-renderer
  * :lock: No longer use the barcode API
  * :lock: Make barcode API call use HTTPS
  * Merge pull request #37 from RyanNerd/typescript-continued-1
  * :art: Merged fix from master that fixes TS errors
  * :art: Fixed the problem with App.tsx throwing TS errors
  * Merge pull request #36 from RyanNerd/resident-color-prod-dev
  * :children_crossing: Resident color changes depending on prod/dev
  * :pencil2: Minor fix to index.js
  * Merge pull request #33 from RyanNerd/fix-delete-med-web-issue-8
  * :bug: Fixed issue where the edit medicine modal would show when deleting a medicine
  * Merge pull request #32 from RyanNerd/fix-refresh-med-list
  * :bug: Remove unneeded and buggy code from RefreshMedicineList
  * :bug: Fix RefreshMedicineList
  * Continued TypeScript conversion
  * Merge pull request #31 from RyanNerd/typescript
  * :art: Start on the path of using TypeScript
  * :package: Updated to use the latest create-react-app
  * :package: Add support for TypeScript
  * Merge pull request #30 from RyanNerd/med-alert
  * :sparkles: Alert message for last time med was taken
  * :art: Fix DocBlocks and remove an unneeded CSS file
  * Update README.md
  * Work-around for weird bug in projection for deleting medicine
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for Deleting a medicine
  * BUGFIX: When adding new resident the medicineList and activeMedicine are cleared
  * RefreshMedicineList now uses search() instead of query() so order_by can be used.
  * Refresh of drug history/log for unTrashed residents and a fix for delete dialog only working once.
  * Added logic to restore inactive residents
  * Merge pull request #25 from RyanNerd/remove-delete-medicine-scan-tab
  * Removed the Delete Medicine button on the MedicinePage
  * Merge pull request #22 from RyanNerd/manage-medicine-barcode
  * Remove subdomain from authentication request
  * Merge pull request #16 from RyanNerd/bacode-refresh
  * Refresh barcode image if the barcode changes
  * Merge pull request #15 from RyanNerd/new-resident-become-active
  * If an existing resident is edited/changed or added make that the ActiveResident
  * Clear barcode when barcode not recognized (after an add or if add is cancelled)
  * Resident DOB for Nov(11) not allowing anything more than 28
  * Add blank EOL to ResidentEdit
  * ResidentGrid columns have LastName FirstName now
  * Fix date verification code
  * Merge remote-tracking branch 'origin/master'
  * Fixed bug when deleting medicine would crash
  * Git ignore the lock files so we don't need to deal with them in production.
  * Added some valdation to ResidentEdit
  * Moved TODO items as issues in Github.
  * Split MediciineListGroup as it's own component to simplify MedicinePage
  * Fixed barcode update issue
  * Added FillDate fields to the MedicineEdit
  * Added barcode and fixed error when no residents exist.
  * Allow deleting medicine
  * Fixed adding new medicine from ManageDrug page
  * Prepped ResidentPage for 'Show Deleted'
  * Fixed a bug when medicine was added on the fly when a barcode is not found
  * Rearranged Medicine edit and delete buttons on Medicine page
  * Removed Chrome Requirement
  * Refactored AddNewMedicineButton into its own component
  * ManageDrugs proof of concept
  * DrugLogGrid layout style changes
  * DrugHistoryPage
  * DrugHistory proof of concept completed
  * Fixed a cosmetic issue in DrugLogGrid as well as updated Reactn in `package.json`
  * MedicineLog now contains ALL history for ALL drugs and is filtered in DrugLogGrid
  * Save progress (proof of concept for window popup)
  * More error handling
  * onError handling via catch() in MedicinePage
  * onError handling
  * Changed text color to blue for Dialog box when a barcode not found
  * Dialog box when a barcode not found
  * DocBlocks for MedicinePage
  * Added delete drug log record feature and fixed a problem when cancelling delete drug.
  * Fixed problem with drug log not updating properly when a new drug was added.
  * Added browserInfo function and moved InitialState.js into the utility directory
  * favicon
  * Use .env to indicate API base url and if development
  * Remove useless code from Frak
  * Small update to the README
  * Update README.md with a better description of this project.
  * ProviderBase preliminary code
  * Document Providers
  * Added logic to delete a Resident
  * Removed the forced uppercase
  * Made drugLogList a global
  * When a resident is selected from the resident list and they have medicine the first one in the list will become the activeDrug
  * Logging of Drugs Modal and POST logic added.
  * Logging of Drugs almost complete
  * Delete functionality, ConfirmationDialog, and InformationDialog components
  * Even more Additional MedicinePage layout changes
  * Additional MedicinePage layout changes
  * MedicinePage layout changes
  * Fix security issue with lodash
  * Preliminary work to get MedicineEdit modal up and running.
  * Some clean up in index.js and index.html
  * Save modal update/save changes.
  * Save modal edit changes.
  * Fix security vulnerability in lodash.
  * Merge pull request #1 from RyanNerd/remove-barcode-as-a-bound-global
  * Make barcode value NOT a global
  * Make barcode value NOT a global
  * Some Refactoring and bug fixes
  * ResidentPage use setGlobal instead of useGlobal for setting state only.
  * Add documentation to LoginPage \ MedicinePage
  * Add documentation to LoginPage \ MedicinePage
  * Fix Linting warnings
  * MedicinePage get barcode and dropdown working again.
  * MedicinePage refactoring
  * LoginPage cosmetic changes
  * Conditional logic for display of drug card
  * Moved quite a bit of logic to MedicinePage
  * Proof of concept for MedicinePage
  * Added Delete (layout only) for Resident List
  * Refactored the Resident Table into it's own component ResidentGrid
  * ResidentEdit modal added
  * Additional features added
  * Build out ScanPage a bit more
  * Save Progress
  * Save Progress
  * ResidentList global populated at login without error this time
  * ResidentList global populated at login
  * Save progress
  * Save progress
  * Save progress
  * Save progress
  * remove .babelrc
  * Initial commit from Create React App

  * 0.10.5
  * Code Cleanup :broom:
  * Improve Client Selection Performance :bullettrain_side:
  * 0.10.4
  * Merge pull request #241 from RyanNerd/239-otc-delete
  * Allow OTC medicine to be deleted :bomb:
  * 0.10.3
  * Merge pull request #238 from RyanNerd/237-modal-improvements
  * Modal Improvements
  * Code Improvements for MedicineEdit
  * 0.10.2
  * Refactored the Checkout All Meds confirm modal
  * 0.10.1
  * Fix :wrench: inactive meds showing up in dropdown
  * 0.10.0
  * Merge pull request #235 from RyanNerd/198-soft-delete-medicine
  * Allow Medication to be Deleted :bomb:
  * Change tsconfig.json to not include comments :notebook: in the output
  * Code Clean Up :broom: `` - Use ` `${variable}` ` instead of string concatination - Moved TooltipContainer.tsx to a Container directory under Pages
  * Fix :wrench: problems found with inspections
  * MedicineDrugPage UI Improvement :lipstick:
  * MedicineEdit UI Improvements :lipstick:
  * UI :lipstick: Improvements for `<Confirm.Modal>`
  * Change how the search text is ClientPage is handled
  * 0.9.8
  * 0.9.7
  * ResidentGrid => ClientGrid Name change
  * Fix :wrench: Med Labels from Client dropdown printing all clients
  * 0.9.6
  * Merge pull request #234 from RyanNerd/224-inactive-meds-in-pillbox-item-grid
  * Fix :wrench: PillboxItemGrid showing inactive meds
  * Merge pull request #233 from RyanNerd/231-deconstruct-props-manage-drug-page
  * ManageDrugPage Improvements :sparkle:
  * 0.9.5
  * Confirm component Enhancement :sparkler:
  * 0.9.4
  * Merge pull request #232 from RyanNerd/227-conslidate-confirms
  * Consolidation of confirm modals
  * 0.9.3
  * Merge pull request #226 from RyanNerd/225-active-field-otc
  * UI change for Manage Rx and Manage OTC
  * Merge pull request #221 from RyanNerd/216-client-object
  * Get confirmation for checkout all if there are exiting checked out meds
  * MedicineEdit Improvements :sparkler:
  * Fixed a :bug: bug where if all medications are inactivated the Med dropdown would be empty showing the last active medication
  * - Changed the name of the `Client` type to `TClient` and moved it into global.d.ts - Added some documentation in RecordTypes.ts
  * Use a Client object that contains all the data for the client
  * Prevent tooltip from showing in printout for checkout all feature
  * Merge branch 'no-toast-printed'
  * 0.9.2
  * Prevent Toasts from showing in printouts
  * 0.9.1
  * Merge pull request #215 from RyanNerd/213-med-dropdown-checkout-indicator
  * UI :lipstick: enhancement for Med Dropdown
  * 0.9.0
  * Tweaking the Checkout All feature UI :lipstick:
  * 0.8.27
  * Remove ; from ManageDrugPage.tsx render
  * Merge pull request #214 from RyanNerd/143-checkout-meds-on-deactivate
  * All Medication Checkout Feature
  * PillPopover Improvements
  * Merge pull request #212 from RyanNerd/211-state-render-med-pb-list-group
  * Fix :wrench: state sync with MedicinePage and PillboxListGroup
  * Fix warnings :warning: in the React console
  * 0.8.26
  * Added `medicineOtcList` constant to MedicinePage
  * Global State moved up for PillboxCard
  * Simplify `gridLists` prop processing
  * 0.8.25
  * Merge pull request #210 from RyanNerd/209-pillbox-log-grid
  * Pillbox components use `gridLists` prop to reduce prop drilling
  * Last of the JSDoc linting rules and fixes :wrench:
  * More JSDoc linting rules and fixes :wrench:
  * 0.8.24
  * JSDoc linting rules and many fixes :wrench:
  * Even More linting settings and fixes
  * 0.8.23
  * More linting settings and fixes
  * Added ``'react-hooks/exhaustive-deps':'error'` to the linter
  * OverlayTrigger has a TS bug :bug: for required attributes, that aren't really required
  * 0.8.22
  * Added some plugins to the linter
  * 0.8.21
  * Merge pull request #206 from RyanNerd/201-show-pillbox-name
  * Show pillbox name in Grids
  * 0.8.20
  * Make it more obvious when in DEV mode
  * 0.8.19
  * Merge pull request #205 from RyanNerd/169-error-boundary
  * Experiment with <ErrorBoundary>
  * Merge pull request #204 from RyanNerd/tslint2eslint-pretty
  * Convert from tslint to eslint and using prettier
  * 0.8.18
  * Make all props in CheckoutGrid required
  * 0.8.17
  * Merge pull request #203 from RyanNerd/202-create-checkout-grid
  * Create CheckoutGrid
  * 0.8.16
  * Added missing hook dependancy
  * 0.8.15
  * Merge pull request #200 from RyanNerd/196-refactor-medlistgroup
  * Pillbox logging and UI Improvements
  * 0.8.14
  * Merge pull request #197 from RyanNerd/195-remove-local-storage
  * Pillbox Remove Local Storage
  * 0.8.13
  * Merge pull request #194 from RyanNerd/pillbox-log-history
  * Pillbox Drug Log History
  * 0.8.12
  * Merge pull request #192 from RyanNerd/190-ui-pillbox-listgroup-improvement
  * Log Pillbox and UI Improvements
  * 0.8.11
  * Only Log Pillbox Items if the medicine is active
  * Add Strength of drug to PillboxListGroup Card
  * History should include inactive drugs
  * 0.8.10
  * Merge pull request #189 from RyanNerd/188-fix-bs
  * BS Color Fix :wrench:
  * Revert "BS Color Fix"
  * BS Color Fix
  * 0.8.9
  * Capitalize Pillbox Name in dropdown
  * Merge pull request #187 from RyanNerd/checkout-badge
  * More Medicine Checkout Improvements
  * Merge pull request #184 from RyanNerd/checkout-badge
  * Add a badge to the Print Checkout buttons
  * Merge pull request #183 from RyanNerd/179-remove-med-checkout-tab
  * Remove Med Checkout Tab
  * Alert pillbox name was not capitalized
  * 0.8.8
  * Merge pull request #181 from RyanNerd/pillbox-ui-improvement
  * Pillbox UI :lipstick: Improvements
  * Merge pull request #180 from RyanNerd/druglog-notes-can-be-null
  * Fix :bug: issue where drugLog.Notes could be null
  * MedicinePage was pitching a fit about importing DrugLogHistory.tsx so this got renamed to MedDrugLogHistory.tsx
  * 0.8.7
  * Merge pull request #178 from RyanNerd/177-credentials-need-alert
  * LoginPage wasn't showing alert with failed credentials :lock:
  * Merge pull request #176 from RyanNerd/simple-ifs
  * Reformat :construction_worker: Code in several modules
  * 0.8.6
  * Merge pull request #175 from RyanNerd/manage-rx-toast
  * Add Toast :bread: to ManageDrugPage
  * 0.8.5
  * Merge pull request #174 from RyanNerd/disabled-spinner-children
  * DisabledSpinner UI :lipstick: Improvements
  * Merge pull request #173 from RyanNerd/med-dropdown-subtext
  * Better UI for other drug names in dropdown
  * Merge pull request #172 from RyanNerd/170-medicine-drop-down-other
  * Display Other Drug Names in dropdown
  * 0.8.4
  * Merge pull request #171 from RyanNerd/code-clean-up
  * Code clean up
  * 0.8.3
  * Fixed About.tsx to allow using X to close
  * 0.8.2
  * removal of PopoverButton.tsx as it is unused
  * Add missing type declarations in reactn
  * Merge pull request #168 from RyanNerd/145-remove-apikeyobserver
  * Simplify the login authentication process
  * Simplify About modal
  * Merge pull request #167 from RyanNerd/163-fix-asyncwrapper-ts-errors
  * Fix :wrench: `asyncwrapper()` typing errors
  * Merge pull request #166 from RyanNerd/print-history-formatting
  * Print History Formatting
  * Merge pull request #165 from RyanNerd/more-ui-changes-pillboxlistgroup
  * Redesign UI :lipstick: PillboxListGroup
  * Merge pull request #164 from RyanNerd/pillbox-ui-change
  * Redesign UI :lipstick: PillboxListGroup
  * Suppress TypeScript errors that suddenly became a problem
  * 0.8.1
  * Removal of the unused MedicineDetails grid
  * Merge pull request #161 from RyanNerd/159-create-otclistgroupgrid
  * Create a grid specifically for OtcListGroup
  * Merge pull request #160 from RyanNerd/157-create-manageotcgrid
  * Create a grid specifically for ManageOtcPage
  * Merge pull request #158 from RyanNerd/147-add-search-manage-otc
  * Add Search :mag: Textbox to Manage Otc Tab
  * Merge pull request #156 from RyanNerd/154-refactor-druglog-grid
  * Refactor Drug History
  * Merge pull request #155 from RyanNerd/152-drug-history-rx-tab
  * Add History Radio Button to Rx tab - Factored out the meat of DrugHistoryPage into DrugHistory.tsx - DrugHistoryPage and MedicinePage use DrugHistory for display of drug log history and print - Added "(OTC)"" to the DrugLogGrid indicating an OTC drug log - Memoized DrugHistoryPage in the LandingPage to reduce re-renders
  * Merge pull request #153 from RyanNerd/149-remove-the-drug-log-table-from-manag
  * Remove Drug Log table from ManageDrugPage
  * Reorganization and Toast own component
  * Merge pull request #151 from RyanNerd/fix-checkout-drug-history
  * Show checkouts in drug log history
  * Merge pull request #150 from RyanNerd/performance
  * Performance :runner: enhancements
  * Performance :runner: enhancement
  * 0.8.0
  * Merge pull request #142 from RyanNerd/pillbox-full-feature
  * UX :bar_chart: Improvement
  * UI :lipstick: improvement
  * Toasts UI :lipstick: improved
  * Limit the DrugLogList to the last 5 days
  * Experimental hook for checking idle
  * - Improved the performance of the pillboxMedLog[] -
  * UI :lipstick: Improvements
  * PillboxListGroup takes children as a prop
  * Pillbox Display
  * PillboxListGroup.tsx changes
  * Code clean up
  * Removal of ClientObserver.ts
  * Removal of the PillboxObserver.ts
  * Removal of the PillboxItemObserver.ts
  * Removal of the DrugLogObserver.ts
  * Code clean up - Remove unneeded `e: React.MouseEvent<HTMLElement>` arguments in MedicineDetail.tsx and components that use it. - Moved the todo: add search box to Manage OTC from comment to an issue - Fixed a bug where even if cancel was chosen do delete an OTC drug the drug would get deleted anyway.
  * Print Medicine Checkout
  * - Change import for react-bootstrap to use direct imports for all components - When the OTC search textbox is cleared the `activeOtc` gets set to null. This was causing visual sync up issues. The search text would be set to an empty string but the selected drug would still be active.
  * Many changes
  * Make multiSort() generic
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * Refactoring
  * Fix :wrench: some UI :bug: bugs
  * More UI :lipstick: on MedicinePage
  * UI :lipstick: Changes
  * Fixing my brain fart
  * Fix :wrench: deleting a drugLog wasn't refreshing the `drugLogList`
  * removed lastTaken as a useState()/useEffect()
  * Removed `drugLogList` from MedicinePage
  * Merge remote-tracking branch 'origin/pillbox-full-feature' into pillbox-full-feature
  * Attempted a refactor of the async DrugLog
  * UI :lipstick: Change to log buttons
  * UI :lipstick: Change to log buttons
  * Significantly Simplified PillboxListGroup
  * Significantly Simplified PillboxListGroup
  * Refactored some pillbox log history functions
  * Partially fix "update" in the MedicineManager.ts
  * Attempt at getting Log Pillbox functionality
  * Show pillbox items in the med dropdown list
  * = Disable the Pillbox radiobutton if `medicineList` has less than 5 items
  * - OtcListGroup search textbox autoFocus - The MedicineDetail grid row will appear in bold if selected
  * Minor code clean up in MedicinePage.tsx
  * Simplified OtcListGroup
  * Flatten and sort all imports
  * - Fixed a missing useEffect dependency in MedicinePage.tsx - Flattened imports   - See: https://dev.to/nilanth/no-more-import-in-react-2mbo
  * Remove `activeClient` global
  * Manage activeMed state better when adding med
  * Keep state of activeMed when drugs are logged
  * :broom: Clean up code
  * Move all PillboxPage.tsx into PillboxListGroup.tsx - Moved the logic from PillboxPage as a landing page item instead making it a ListGroup item - Fixed a bug in `getPillboxItemS()` where the filter wasn't including the `pillboxId` - Removed the PillboxPage from the LandingPage - Added PillboxCard.tsx as a more feature rich PillboxItemGrid - MedicinePage.tsx updated to use PillboxListGroup new features and PillboxCard - PillboxItemGrid.tsx :building_construction:  scaffolding added for click on row functionality - PillboxListGroup.tsx placeholder replaced with actual logic and features :atom_symbol: - Destroyed :bomb: PillboxPage.tsx - Destroyed :bomb: MedicineListGroup.tsx
  * - Set initial state of `activeMed`, `activeOtc` & `activePillbox` by using `usePrevious()` hook. - Changed `LIST_TYPE` to `DISPLAY_TYPE` and added a Print to the enum. - Removal of the `<Collapse>` component in OtcListGroup.tsx - Conditional rendering fixed and updated in MedListGroup.tsx - LandingPage.tsx documentation updated
  * Moved state back down to components in LandingPage
  * Major :ringed_planet: :construction_worker: Overhaul of MedicinePage - MedicinePage can now be in one of three states:   1. Medicine - select and log prescriptions   2. OTC - Select and log OTC drugs   3. Pillbox - Select a pill box and log drugs therein - Complete UI :lipstick: redesign for MedicinePage.tsx - MedListGroup changed to **only** handle prescriptions (was handling pillbox and drugs -- needed separation of concerns) - Removed Show/Hide OTC buttons in OtcListGroup - Added PillboxListGroup.tsx - Added radio buttons Medicine, OTC, and Pillbox to let user set state. - OtcList global moved to LandingPage.tsx and passed into MedicinePage.tsx
  * - Minor code clean-up in About.tsx - ActiveResidentObserver.ts uses the `usePrevious()` hook now. - ApiKeyObserver.ts uses `asyncWrapper()` for better error control. - Minor code clean-up in ConfirmDialogModal.tsx - Very minor code clean-up in ErrorDetailsObserver.ts (removed a space) - Added function getPillboxItems.ts so MedicinePage.tsx and PillboxPage.tsx can share code. - Added `IPillboxItemObserver` interface to global.d.ts - Some code clean-up for LandingPage.tsx as well as some todos. Also `<PillboxPage>`` takes additional attributes passed in from LandingPage. - Minor code clean-up in MedDropdown.tsx - Added `<PillboxItemGrid>` to be displayed when the selected activeId is a pillbox. - Code clean-up for MedListGroup.tsx  - `<TooltipButton>` replaced with a standard `<Button>`  - Removed `tooltipText()` since it was displaying with the `<ToolTipButton>` anyway  - Added a + Log ALL Drugs in Pillbox button (not currently functional - PillboxItemGrid.tsx uses getPillboxItems.ts to build out the `PillRows. Some code clean-up. - Code clean-up in PillboxItemObserver.ts - PillboxPage.tsx   - Added props refresh for `pillboxItemList`, `pillboxList`, and `activePillbox`   - Use `getPillboxItems()` to fetch `PillboxItemRows` - Added a `usePrevious()` hook.
  * - Continued the overhaul of MedicinePage.tsx to use MedListGroup.tsx and support pillboxes. activeId is used instead of activeDrug. - Moved state from MedDropdown.tsx for the buildout of the listItems to MedListGroup.tsx. This solved a bunch of issues. - Removed the `medicineList` and `pillboxList` from MedDropdown.tsx replacing them with an `itemList` prop that comes from the MedListGroup.tsx solving a bunch of issues.
  * - Added `React.StrictMode` to all things ` <LandingPage>` :small_airplane: - Moving state up to the LandingPage.tsx for global lists. - Starting on the major revamp of MedicinePage.tsx so that it can support Pillboxes - MedListGroup.tsx created to replace MedicineListGroup.tsx - MedDropdown.tsx replaces MedicineDropdown.tsx - Minor :lipstick: cosmetic changes to PillboxEdit.tsx - Minor :lipstick: changes in PillboxPage.tsx
  * - :lipstick: Code Formatting
  * - :lipstick: UI formatting for the `TabPane` in PillboxPage.tsx   - The `Card.Title` now has a formatted pillbox name that looks similar to the selected `Nav` item.   - Added some text to help users know how to determine what is in the selected pillbox - Added Bootstrap color enumerator `BsColor` to common.ts - Both PillboxPage.tsx and PillboxItemGrid.tsx use `BsColor` enum
  * - Quantity selection in PillboxItemGrid.tsx is now a dropdown split button - Scaffolding set up for `onEdit()` handling in PillboxPage.tsx
  * - Significantly changed how PillboxItemGrid.tsx works by:    - sorting on Quantity, Drug    - Removed :boom: delete button    - Added small buttons of + qty    - All medicines for the client are displayed in the grid - PillboxPage.tsx changed to handle the new signature of PillboxItemGrid.tsx - Added _multiSort()_ function in common.ts to handle multiple column sorting.
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature
  * [WIP] Pillbox Feature - Got default pillbox and tab content to work via `active` attribute - Added a really important field to `PillboxItemRecord` (MedicineId was missing) - PillboxItemObserver.ts removal of `console.log()` diagnostic - PillboxItemGrid.tsx component added - Removal of unused imports in PillboxEdit.tsx - Moved state for PillboxPage up to the LandingPage.tsx
  * Update README.md and LICENSE.txt
  * Pillbox Feature
  * Pillbox Feature
  * 0.7.2
  * Merge pull request #141 from RyanNerd/manage-rx-row-size
  * UI :lipstick: fix :wrench: for ManageRx tab
  * 0.7.1
  * Fix a regression :bug: in MedicineEdit.tsx
  * Merge pull request #139 from RyanNerd/active-switch
  * 0.7.0
  * Medicine Active checkbox and Other drug names
  * 0.6.1
  * - When coping a the client name to the clipboard use the format FirstName LastName (was Lastname, FirstName) - Spelling fix in DiagnosticPage.tsx
  * Merge pull request #136 from RyanNerd/pillbox
  * 0.6.0
  * Search criteria signature change
  * Search criteria signature change
  * Dependency version & Diagnostics
  * Merge pull request #133 from RyanNerd/client-dropdown-minor-change
  * 0.5.1
  * Client dropdown addition
  * Version bump
  * Merge pull request #132 from RyanNerd/108-force-print-dialog-when-a-new-client
  * When adding new client show print dialog
  * Merge pull request #131 from RyanNerd/129-when-the-system-crashes-the-client-n
  * When ErrorDetails displayed unset ActiveResident
  * Fix a minor spelling error in code comments
  * Merge pull request #130 from RyanNerd/124-change-how-name-button-popover-works
  * Revamp the client name and DOB buttons
  * [WIP] Revamp the client name and DOB buttons
  * Merge pull request #128 from RyanNerd/121-notes-and-directions-for-packs-
  * For DrugHistory use a combo of Notes & Directions
  * Chage link text in About.tsx for issues - Closes #125
  * Updated the docblock for `clientFullName()` in common.ts
  * Merge pull request #127 from RyanNerd/nick-name
  * Nickname added to client / resident
  * Merge pull request #120 from RyanNerd/119-validate-client-dob-is-not-in-the-fu
  * Prevent DOB set in future
  * Merge pull request #118 from RyanNerd/112-medicineedit-fill-date-validation-
  * Prevent future Fill Date when editing Medicine
  * Merge pull request #117 from RyanNerd/109-change-isdayvalid-ismonthvalid-and-i
  * isYear, isDay, and isMonth Valid signature change
  * 0.4.5
  * npm run build exports memory limit before running
  * Small update to README.md
  * Merge pull request #116 from RyanNerd/115-clicking-on-client-dob-button-should
  * Launch edit modal for active client when DOB button clicked
  * Merge pull request #114 from RyanNerd/110-figure-out-why-the-medicineedit-moda
  * Fix 🔧 display issue with MedicineEdit.tsx
  * Merge pull request #113 from RyanNerd/tweak-fill-date-validation
  * Medicine Fill Date 📅 validation 👮
  * Merge pull request #111 from RyanNerd/fix-fill-date
  * Add Fill Date validation 👮
  * Merge pull request #107 from RyanNerd/quack-quack-die
  * Remove 🦆 typing from ManageDrugPage.tsx
  * Merge pull request #106 from RyanNerd/druglog-edit-validation
  * - Consolidated `getDrugName()` in common.ts - Code clean-up 🧹
  * [WIP] Don't show Out or In fields in DrugLogEdit if OTC
  * Removed a todo that was done
  * Merge pull request #101 from RyanNerd/spinner-observer
  * Add spinner to indcate when system is busy
  * Add spinner 🎡 to Medicine Dropdown when disabled
  * Merge pull request #100 from RyanNerd/observer-finally
  * Use `finally()` in observer promises
  * Delay before invoking print dialog for ClientRoster
  * LoginPage 👷 Rework
  * 0.4.4
  * Merge pull request #99 from RyanNerd/login-flair
  * LoginPage 👷 Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage  Rework
  * [WIP] LoginPage 👷 Rework
  * Clean-up 🧹 code and documentation
  * Version Modal Additions
  * 0.4.3
  * Determine the version via npm env
  * 0.4.2
  * Merge pull request #98 from RyanNerd/revamp-otc
  * Revamp 💄 👷 OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp  the OTC ListGroup
  * [WIP] Revamp 👷 the OTC ListGroup
  * 0.4.1
  * Merge pull request #97 from RyanNerd/fix-dupe-client-issue
  * Fix  Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * [WIP] Fix 🔧 Resident record dupe problem
  * 0.4.0
  * Merge pull request #96 from RyanNerd/client-notes
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * 0.3.18
  * Fix 🔧 + OTC and Edit OTC buttons from bleeding through
  * Merge pull request #95 from RyanNerd/version-update
  * Version updates in package.json
  * Add useStickyState hook for possible future use
  * More code changes to TooltipButton
  * Fix missing required attributes in TooltipButton
  * Get rid of the useless @constructor in JSDOC headers
  * Get rid of the useless @constructor JSDOC
  * Merge pull request #94 from RyanNerd/about-page
  * 0.3.17
  * Add About Modal
  * Merge pull request #93 from RyanNerd/client-name
  * 0.3.16
  * Client name and DOB headers are separate buttons
  * Merge pull request #92 from RyanNerd/fix-client-name-update
  * 0.3.15
  * Fix 🔧 ActiveResident global not getting updated when client info updated
  * Merge pull request #91 from RyanNerd/client-printout
  * 0.3.14
  * Add Feature to Print Client Roster
  * 0.3.13
  * Merge pull request #90 from RyanNerd/client-roster
  * Add Feature to Print Client Roster
  * Merge pull request #89 from RyanNerd/fix-drug-log-edit
  * 0.3.12
  * 🔧 Fixed DrugLogEdit
  * Merge pull request #88 from RyanNerd/bulk-med-checkout
  * 🔧 Fixed Print Medicine Checkout in Manage Rx tab
  * Merge pull request #87 from RyanNerd/bulk-med-checkout
  * 0.3.11
  * Log Drug from Manage Rx tab
  * 💄Log Drug from Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * Date.toLocaleString() TS fix
  * Merge pull request #86 from RyanNerd/otc-in-rx-page
  * 0.3.10
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and medical logging
  * Merge pull request #82 from RyanNerd/show-client-print
  * Add client name and DOB to DrugHistoryPage print area
  * 0.3.9
  * Merge pull request #81 from RyanNerd/get-version-from-package.json
  * Use package.json to obtain version
  * Merge pull request #80 from RyanNerd/fix-print-margins
  * Fix print margins
  * Merge pull request #79 from RyanNerd/fix-drug-history-print
  * Allow the printing of the client name in DrugHistoryPage
  * Bumped up RxChart version in package.json
  * Added Out and In columns to MedicinePage drug log grid
  * Merge pull request #78 from RyanNerd/no-print
  * Print MedicineCheckout Enhancements and 🔧 Fixes
  * Merge pull request #77 from RyanNerd/dependancy-version-update
  * Upgrade ⬆ dependency versions
  * Merge pull request #76 from RyanNerd/disable-login-field-empty
  * Disable Login button if password or username are empty 🗑
  * Merge pull request #75 from RyanNerd/base-url-error-message
  * Display error message if .env is missing or BASEURL isn't set
  * Bumped the version in package.json
  * 💊 Medicine Checkout Feature
  * Merge pull request #74 from RyanNerd/medicine-checkout-feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💥 Remove `<any>` type
  * ♻ Refactor Validation 👮 code into its own 📁
  * 🔧 Fix `drawBarcode()` to verify the canvas element exists before trying to draw the barcode
  * 💊 OtcPage.tsx
  * 💊 MedicinePage
  * 💊 MedicinePage
  * 💊 MedicinePage 🐛 fix
  * 🔨 Fix pressing enter in search textbox causes app to reset.
  * 🔧 Fix NPM dependency ➕
  * Revert tsconfig.json
  * tsconfig.json is pitching a 😠 fit
  * Removed the development 🙈 requirement for the DiagnosticPage.tsx
  * Merge pull request #73 from RyanNerd/disable-log-buttons
  * 🎇 Added disable feature to the log buttons
  * ⬆ Upgraded dependencies
  * 0.3.5
  * 0.3.4
  * Merge pull request #72 from RyanNerd/fix-scroll-to-modal
  * Removed scrollTop feature from all tab pages
  * Merge pull request #71 from RyanNerd/prevent-client-dupe
  * ResidentManager fixed 🔧 to prevent dupes
  * ♻ setApi() changed to emit a promise - Loading of client records, OTC records now only happens AFTER the apiKey is set for ALL providers. - Discourse on the Observer middleware architecture is exhastively commented in App.tsx
  * Consolidation 🧑‍🤝‍🧑 of the AuthObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the OtcMedicineObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the DrugLogObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the MedicineObserver 🔭
  * Merge pull request #70 from RyanNerd/observer-consolidation-client
  * Consolidation 🧑‍🤝‍🧑 of the ClientObserver 🔭
  * Added `logout` as a global 🌎 hook 🎣
  * 💄UI Improvements in MedicinePage
  * :boom: removed `console.log()` from UpdateClientObserver.ts
  * ♻ When a new client is added make that client active
  * 💥 Removal of Search box from MedicinePage
  * Merge pull request #69 from RyanNerd/code-reformatting
  * - 💄Code formatting for multiple modules
  * - 💄JSDoc  and code formatting changes
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * Merge pull request #67 from RyanNerd/otcpage-using-table
  * 💄 UI for OtcPage changed to list 📜 OTC drugs in a table
  * Fix 🔧 a minor linting problem
  * Add Search 🔍 Validation
  * ♻ Refactored <LogButtons> into its own component
  * Added Log button stack to the ListGroup
  * 🚘 In progress - OtcPage using table instead of MedicineListGroup
  * 💄 Changed Tab order in LandingPage.tsx
  * Merge pull request #66 from RyanNerd/hooks-4-updates
  * OtcPage now uses declarative hooks 🎣 for updates and delete processing
  * 💄A little bit of code clean-up 🧹
  * A couple of hooks 🎣 added for OTC
  * 💄Code formatting and adding better comment 💬 headers
  * ♻ Refactoring
  * `login` is now a global 🌎 hook 🎣 that is set to the `{username, password}` when a user logs in.
  * `refreshOtc` is now a hook 🎣 trigger 🔫 for when the otcList needs to be refreshed.
  * - `deleteMedicine` is now a hook 🎣 trigger 🔫 for when a MedicineRecord is to be deleted. - 💄Reorganized the code in App.tsx
  * - `deleteDrugLog` is now a hook 🎣 trigger 🔫 for when a DrugLogRecord is to be deleted. - Fixed a 🐛 in the DiagnosticPage where `CloseErrorButton` wasn't inside the `useMemo()` - Changed MedicineManger, MedicinePage, and OtcPage with how it handles deletes in prep for the next salvo of changes.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Merge remote-tracking branch 'origin/hooks-4-updates' into hooks-4-updates
  * 🎣 App.tsx is the single source of truth via hooks 🔧 Fixed a problem when the medicine dropdown changes the selection would revert back to the original value.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 💄Code format changes
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Add ShadowBox 🔲 to Directions in MedicineListGroup - Just for flare's 🌈 sake
  * Merge pull request #65 from RyanNerd/toggle-switch
  * Merge pull request #64 from RyanNerd/shadow-box
  * Add ShadowBox 🔲
  * Add ToggleSwitch 💡
  * 🔧 Fixed the double underline for the medicine link ⛓
  * 💄Add link ⛓ on MedicinePage for drugs 💊 - Added some flair 🌈 to the link via CSS - Link uses [GoodRx](https://goodrx.com)
  * Merge pull request #63 from RyanNerd/react-upgrade-workaround
  * 🔧 Work-around a 🐛 with ⚛ React 17 and DropdownButton - See: https://github.com/react-bootstrap/react-bootstrap/issues/5409 - The work around is here: https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584 - package.json was changed to bring in React ⚛ v17.0.1
  * Add support for Willow 🌳 API error handling - ♻ Refactored DiagnosticPage by adding <CloseErrorButton> reusable component - 🌳 Willow API error parsing added to DiagnosticPage.tsx
  * ♻ Refactoring to import using reactn when possible
  * Merge pull request #62 from RyanNerd/error-state-logout
  * Disable Login page when there is an error
  * 🥅 DiagnosticPage now resets correctly when dismissed - Changed order of operations with LoginPage when testing errors. - Changed LandingPage handling `dismissErrorAlert()` to set global state back to initial values.
  * 🎨 Change activeTabKey state to be string only
  * 💄Added Log 3 & log 4 buttons - Buttons added to MedicineListGroup, MedicinePage, and OtcPage - Added scroll to top for all pages when that page becomes active (except for the LandingPage as that page is always active whem the app starts)
  * Add 📜 Scroll-to-top logic in the ResidentPage when it becomes active
  * 💄When a resident is selected reset the search textbox to an empty string. After a resident is selected when the user returns to the ResidentPage tab typically they are looking to select a different resident or add one and reseting the search textbox to empty string shows the entire resident list.
  * 💄More code formatting in ResidentPage
  * 💄Code formatting 🔨 fix in ResidentPage
  * Merge pull request #61 from RyanNerd/resident-search
  * Add a search 🔍 filter to ResidentPage
  * 🐟 Upstream merge from master
  * 💄Make the Medicine tab title Rx
  * Add search 🔎 to ResidentPage
  * 💄Make all modals backdrop = ⚡static⚡ Modals can no longer be dismissed by clicking off the modal.
  * Added missing `ResidentId` to DrugLogRecord
  * 💄 ResidentGrid now shows Created and Activated columns as formatted dates
  * 📜 Scroll to the top of the page when MedicinePage is active
  * 🔥Removal of no-namespace rule in tslint.json The previous merge allows this rule to be reestablished as the default
  * Merge pull request #60 from RyanNerd/bwip-js-update
  * 🔥Removal of bwip-js.d.js the 👽📦 updated
  * :rotating_light: Added `tslint-react-hooks` to the linter
  * ♻ Refactored ✈LandingPage and  ⚕DrugHistoryPage ⚕DrugHistoryPage now uses globals instead of props Single responsiblity.
  * ✈ LandingPage uses CSS to bold active tabs This used to be done via a function.
  * 💄Cosmetic changes to LandingPage
  * Merge pull request #59 from RyanNerd/active-tab-key
  * ⚡ Improve performance by only rendering tab content when that tab is active Added the prop `activeTabKey` to a number of Pages and put conditional logic in place to prevent render when that tab isn't the active tab.
  * Minor code format 🔨 fix
  * ♻ Refactor MedicinePage, OtcPage, and DrugLogGrid - Make `getObjectByProperty()` generic - Move `getDrugName()` to common.ts for refactoring.
  * 💡Updated DocBlocks to be more concise Also removed 🔥 unneeded `: void` return types
  * Minor change when adding new resident auto switch to Rx tab
  * Changed `calculateLastTaken` to use Created date instead of Updated.
  * Merge pull request #58 from RyanNerd/api-set-change
  * 🔧 Fixed a problem with the DropDown button The dropdown button would stop working after a modal was opened. After a 🌦 day of pulling my 🦱 out trying to figure out what had happened. Finally found this: https://github.com/react-bootstrap/react-bootstrap/issues/5409 Had to thunk React back down to 16.14.0
  * Changed how APIs get set in the providers
  * Merge pull request #57 from RyanNerd/external-package-upgrades
  * Updated several 📦 packages to the latest version bootstrap.min.css was removed 🔥 from the public folder and the stylesheet link in index.html was also removed index.tsx now imports bootstrap.min.css using the NPM package The following 📦 packages were upgraded: - React ⚛ - bootstrap 💄 - bwup-js - typescript 📜 One package was removed: - react-new-window
  * Merge pull request #56 from RyanNerd/frak-upgrade
  * Update Frak to latest version and 🔧 fix Providers - 👽 Frak package is no longer an object but is now a function. All providers changed accordingly. - Error 🐛 handling was updated in DiagnosticPage since Frak no longer emits a custom error, but ⚾ throws the Response as an error when there is an exception.
  * Merge pull request #55 from RyanNerd/gotta-catch-em-all
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Automatically activate ⚡ the Rx (medicine) when a resident is selected
  * Added a dismiss 🔥 option for `_alert()` allowing users to log back in. Also 🚛 moved `_alert()` into `useMemo()`
  * Add 📃 JSDoc blocks to DiagnosticPage.tsx Also added some additional 🦆 type checking logic
  * Merge pull request #54 from RyanNerd/diagnostics-retool
  * Retooling 🔧 of DiagnosticPage.tsx
  * Merge pull request #53 from RyanNerd/global-error-handling
  * :bug: Error handling is now done via a 🌎 global called `errorDetail` All components in the Page directory no loger call `onError()` but instead now use `errorDetails()` Moved the observer that hides the Diagnostic tab to the DiagnosticPage.tsx 💄Improved the code in DiagnosticPage.tsx to better display errors depending on the type of error. The error prop that DiagnosticPage.tsx receives is of the type `any` so some 🦆 typing logic was added. global.d.ts and getInitialState.ts were 🔝 updated to handle the new global `errorDetail` TODO: Make the DiagnosticPage.tsx use an accordion component when showing details. This will be a future task.
  * ✨ Added code in LandingPage to more cleanly set the tab titles and bold the tab that is active.
  * Merge pull request #52 from RyanNerd/auth-manager
  * ♻ Refactor Providers and establish AuthManager 🗑 Removed ProviderTypes.ts moving the type definitions to the individual providers ✨ Created AuthManager to be consistant with design
  * ResidentPage code clean-up 💄 🗑 Removed `refreshDrugs()` since it was only being called from one place and refactored ♻ the code into the orginal caller.
  * 🔧 Fix ResidentPage which had a recursive 🐛 🗑 Removed the `useEffect()` and replaced it with `refreshDrugs()` upon edit/add/select/delete operations
  * ♻ Refactored all the .tsx files in the Pages directory to the components directory
  * Merge pull request #51 from RyanNerd/autoload-lists
  * Handle resident changes via useEffect to reload 🔃 residentList, medicineList, and drugLogLists ♻ Refactored ResidentManager eliminating 🗑 the complexity
  * Merge pull request #50 from RyanNerd/medicine-manager
  * ♻ Refactored ManageDrugPage, ManageOtcPage, and OtcPage to use the :sparkles: new MedicineManager.ts
  * ♻ Refactored MedicinePage to use :sparkles: new MedicineManager.ts
  * Merge pull request #49 from RyanNerd/current-resident
  * 💄Cosmetic code changes and made providers more logical ♻ Refactored the Providers to take baseUrl as an argument 🗑 Removed baseUrl from the globals
  * ✨ Major ♻ refactoring for Resident bussiness logic  Moved all business logic to a ResidentManager module.
  * More 🚲 Bikeshedding cosmetic 💄 code changes to multiple modules
  * 🚲 Bikeshedding some 💄 cosmetic code changes to MedicineListGroup
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to ResidentGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to MedicineDetail
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to DrugLogGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to TooltipButton
  * :sparkler: Added AuthenticationProvider
  * :rocket: Major revision to providers making them type safe :closed_lock_with_key:
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to OtcPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to ManageOtcPage
  * :lipstick: Cosmetic code changes to MedicinePage
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to ResidentPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: cosmetic code changes  uses global State as an interface
  * :lipstick: cosmetic code changes in
  * :lipstick: cosmetic code changes defaulting to empty arrays for lists instead of null
  * :scroll: Typing and :lipstick: cosmetic code changes to DrugLogGrid and DrugHistoryPage
  * :lipstick: Cosmetic code changes including an .editorconfig file to enforce style
  * More :lipstick: Cosmetic changes to the code (indentation and other)
  * :lipstick: Cosmetic changes to the code (indentation and others)
  * :sunglasses: Simplfy the providers even more
  * Further reduce the warning noise :loud_sound: in the console log by :wrench: fixing the show prop to be bool
  * Eliminate the warning noise :loud_sound: in the console log by changing onAnswer to onSelect
  * :sunglasses: Simplify all providers to use Frak directly
  * Merge pull request #48 from RyanNerd/frak-npm
  * Use Frak from the NPM :package:
  * :arrow_heading_up: Update React to 16.14.0 and add lint rules for code line length and :wrench: fix modules that violated the new rule.
  * Added tslinter :heavy_check_mark: and updated all code
  * :wrench: Fix code indentation in ResidentGrid
  * :wrench: Fix code indentation in MedicineDetail
  * :sunglasses: Simplify DrugLogGrid
  * :tractor: Moved  into  and some :scroll: typing changes
  * :scroll: Type code changes in common
  * :sunny: Clean up code for the  function
  * tractor: Moved  to common
  * useForceUpdate deleted :wastebasket: as it was not being used. :scroll: Types extended for TooltipButton
  * :wrench: Fix :scroll: typings in MedicineListGroup for logDrug callback
  * :wrench: Fix :scroll: typings in MedicineListGroup for barcode canvas
  * :wrench: Fix :scroll: typings in MedicineListGroup and OtcPage
  * :wrench: Fix the typings in DrugDropdown and MedicineListGroup
  * :lipstick: Make IProps interface definiton more specific in ResidentGrid
  * :lipstick: Center text for Selected column in ResidentGrid
  * :lipstick: Add Reload button in ResidentPage and :wrench: tighten up code
  * :wrench: Fix ResidentPage to use TooltipButton
  * :lipstick: Remove condenced class from the Resident table
  * Code format :lipstick: changes in Frak
  * :sunglasses: Simplify LastTakenButton
  * :lipstick Don't display the LastTakenButton if the lastTaken value is null
  * :wrench: Fix the display :lipstick: of Last Taken (hours)
  * :wrench: Fixed :lipstick: formatting in DrugLogGrid for Drug and Created rows
  * :sunglasses: Simplify bolding in ResidentGrid and DrugLogGrid
  * :lipstick: Made selected resident row bold. :wrench: fixed the drug log grid to show in bold when drug logged today
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :star2: Add missing Doc-Blocks and :wrench: fix a bug in ResidentPage where medicine logs weren't loading
  * :lipstick: Cosmetic changes to Fill Date display
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in MedicinePage
  * :wrench: Fixed error handling in MedHistoryProvider
  * :wrench: Fixed error handling in MedicineProvider
  * :wrench: Fixed error handling in ResidentProvider
  * :wrench: Error handling and added DiagnosticPage to display errors
  * :twisted_rightwards_arrows: Refactor ResidentPage and fix a :bug: in ResidentProvider
  * :wrench: Tightened up code in ResidentPage
  * :lipstick: Make mouse cursor default when the Log 1 / Log 2 buttons are disabled
  * :eight_spoked_asterisk: More changes to the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :eight_spoked_asterisk: Change the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :arrow_heading_up: Upgraded bootstrap.min.css to latest version 4.4.1
  * :rainbow: Changed the color scheme of the DrugLogGrid based on lastTaken
  * :sunglasses: Simplify the LastTakeButton (remove unused props)
  * :cyclone: Major code clean-up
  * :twisted_rightwards_arrows: Refactor DrugLogGrid to use getObjectByProperty()
  * :lipstick: Show drug name in Delete confirmation dialog for OtcPage and MedicinePage
  * :twisted_rightwards_arrows: Refactor deleteDrugLog
  * :sunglasses: Make MedicineDetail a component with props
  * :sunglasses: Make DrugLogGrid more generic
  * :fire: Remove RxTable and use the Table component instead for simplicity :sunglasses:
  * :sunglasses: Make the MedicineDetail more generic
  * :lipstick: Costmetic change make last taken variant color consistant
  * :twisted_rightwards_arrows: More ResidentPage simplification
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :lipstick: Cosmetic change for Delete confirm in ManageOtcPage
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * Fix a :bug: in Confirm and have ManageDrugPage use the new component
  * Create Confirm in the Modals directory as a better more generic ConfirmationDialog
  * Make the ConfirmationDialog more generic :older_man:
  * Add a more prominant warning :warning: when an OTC drug will be deleted
  * Merge pull request #47 from RyanNerd/react-bootstrap-typescript
  * Cosmetic :lipstick: changes to all the tab titles making them bold when active
  * Minor cosmetic :lipstick: code changes
  * :twisted_rightwards_arrows: For consistancy refactor getResidentList
  * :twisted_rightwards_arrows: Refactor remaining refreshList into getLists
  * :twisted_rightwards_arrows: Refactor RefreshMedicineList into getMedicineList
  * Added a :warning: when OTC meds are edited that the change will be for all
  * :twisted_rightwards_arrows: Refactor of ManageOtc, ManageRx, OtcPage, and MedicinePage
  * :beginner: Simplify addEditDrugLog in Medicine and Otc Pages
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage for logging drugs
  * Refactoring of page to Pages
  * :bowtie: Add Log 2 button to MedicineListGroup & fixed a :bug: in OtcPage
  * :bowtie: change layout of OtcPage to better accomidate the drug history grid
  * fix a :bug: with the error handler. Also hide the Diagnostics tab completely when not active
  * :part_alternation_mark: Change how field setFocus works
  * :scroll: TypeScript conversion even more typings and fix an OTC delete bug
  * :scroll: TypeScript conversion even more typings
  * :scroll: TypeScript conversion ResidentProvider typings
  * :scroll: TypeScript conversion ResidentPage fix :bug: DrugLog refresh
  * :scroll: TypeScript conversion ResidentPage typings
  * :scroll: TypeScript conversion More MedicineProvider typings
  * :scroll: TypeScript conversion MedicineProvider typings
  * :scroll: TypeScript clean-up of Frak and elimination of FrakTypes
  * :scroll: Major TypeScript / object conversion for Frak
  * :scroll: TypeScript / object conversion for Frak
  * :scroll: TypeScript conversion Frak
  * :scroll: TypeScript conversion add useProviders() hook
  * :scroll: TypeScript conversion tighten up more code
  * :scroll: TypeScript conversion tighten up code
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for MedicinePage
  * :scroll: TypeScript conversion for ManageOtcPage
  * :scroll: TypeScript conversion for ManageDrugPage
  * :scroll: TypeScript conversion for LoginPage
  * :scroll: TypeScript conversion for RefreshMedicineLog
  * :twisted_rightwards_arrows: Refactor of Provider helpers
  * :scroll: TypeScript conversion for RefreshOtcList
  * :scroll: TypeScript conversion for DeleteMedicine
  * :scroll: TypeScript conversion for RefreshMedicineList
  * :scroll: TypeScript conversion for ResidentProvider
  * :scroll: TypeScript conversion for MedicineProvider
  * :scroll: TypeScript conversion for DrugHistoryPage
  * :scroll: TypeScript conversion for ResidentEdit
  * :scroll: TypeScript conversion for MedicineEdit
  * :scroll: TypeScript conversion :bug: fix for DrugLogEdit
  * :scroll: TypeScript conversion for DrugLogEdit
  * :scroll: TypeScript conversion Fix :wrench: up for ConfirmationDialog
  * :scroll: TypeScript conversion Remove InformationDialog
  * :scroll: TypeScript conversion ConfirmationDialog
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion DrugDropdown
  * :scroll: TypeScript conversion MedicineDetail
  * :scroll: TypeScript conversion DrugLogGrid
  * :scroll: TypeScript conversion ResidentGrid
  * :scroll: TypeScript conversion RxTable
  * :scroll: TypeScript conversion LastTakenButton
  * :scroll: TypeScript conversion for React Bootstrap
  * :curly_loop: Yet even more TypeScript conversions
  * :curly_loop: Even more TypeScript conversions
  * :curly_loop: More TypeScript conversions
  * :curly_loop: Minor TypeScript conversions
  * Merge pull request #46 from RyanNerd/medicine-otc-page-refactor
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage
  * Merge pull request #45 from RyanNerd/otc-feature
  * :lipstick: Even more cosmetic changes & fix to attribute={true} making React mad
  * :lipstick: More cosmetic changes and a subclass of Table
  * :twisted_rightwards_arrows: Refactored LastTakenButton and some cosmetic changes
  * :fountain: Add Log 1 and Log 2 amounts button feature
  * :lipstick: Cosmetic changes
  * :wrench: fixed a minor type :bug: in MedicinePage and OtcPage
  * :zap: Fixed barcode issues and a :bug: in TooltipButton
  * :sunglasses: Fixed the problem with barcodes not showing up correctly
  * :twisted_rightwards_arrows: Convert index.js to index.tsx
  * :star: Change wording in ResidentPage when deleting to 'deactivate'
  * :white_circle: Clean up code in InitialState.tsx
  * Add and fix docblocks
  * :carousel_horse: Work-around for React null handling stupidity
  * :wrench: fixed code in common.js and converted it to common.tsx
  * Tighten up code in MedicineListGroup
  * bwip-js version bump and minor fix to MedicineListGroup
  * Code formatting fixes
  * Tighten up obserer effects in the modals
  * Disable the Save button if the Drug name is empty in the MedicineEdit modal
  * Disable the Save button if Notes are empty in the DrugLogEdit modal
  * Set focus to first name field in the ResidentEdit modal when it is shown
  * Add support for barcodes in search input box
  * Fix OTC Search is valid icon indicator
  * Fix layout problems when there were no medications
  * Tighten some code in MedicinePage
  * Search validation icon logic clean-up
  * Tighten the search useEffect code
  * Handle search matches via useEffect
  * Add docblock to handleMedicineEditModalClose() helper function
  * Refactoring of ManageOtc and ManageDrug pages
  * If enter is pressed on the password textbox then login
  * Add search feature
  * Made sure all MouseEvents had an e.preventDefault()
  * Add PropTypes to remaining components
  * Added PropTypes checking to all pages
  * Convert all functions to arrow functions
  * Fixed an annoying bug where when adding a new resident the medlist wasn't getting cleared
  * Cosmetic fixes and textbox focus feature added
  * Add Manage OTC Page
  * Tightened up some code in MedicinePage and OtcPage
  * A bit of refactoring
  * created a generic TooltipButton replacing the specific AddMedicine button. Also fixed a bug in DrugLogGrid header
  * Removed leftover barcode handling from OtcPage/MedicinePage
  * OtcPage now displays all OTC meds taken in the history
  * Remove setGlobal and use hooks directly instead
  * Convert functions to const
  * Fix problem with OTC meds not showing drug name in DrugHistoryPage
  * Fixed and optimized drugLogList refresh
  * Tweaking things to support OTC -- almost there
  * Removed query and replaced it with search
  * Tightening up code
  * Move Frak() out of the global space
  * remove corrupted InitalState.tsx.sav
  * Save progress
  * Support for OTC
  * Shrink MedicineListGroup in prep for OTC feature.
  * Add DOB to active resident
  * npm package audit fix
  * Fix error when a barcode has no value
  * Merge pull request #43 from RyanNerd/fix-restore-resident
  * Fix medicine log/list not appearing when a resident is restored
  * Merge pull request #42 from RyanNerd/fix-drug-history
  * :bug: Fix drug name not updating on history when edited
  * Merge pull request #41 from RyanNerd/bootstrap-local
  * :sparkles: Make bootstrap.min.css local instead of using a CDN
  * Merge pull request #40 from RyanNerd/organization
  * :sparkles: Organization name now shows when logged in
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * Merge pull request #39 from RyanNerd/embed-barcode-renderer
  * :lock: No longer use the barcode API
  * :lock: Make barcode API call use HTTPS
  * Merge pull request #37 from RyanNerd/typescript-continued-1
  * :art: Merged fix from master that fixes TS errors
  * :art: Fixed the problem with App.tsx throwing TS errors
  * Merge pull request #36 from RyanNerd/resident-color-prod-dev
  * :children_crossing: Resident color changes depending on prod/dev
  * :pencil2: Minor fix to index.js
  * Merge pull request #33 from RyanNerd/fix-delete-med-web-issue-8
  * :bug: Fixed issue where the edit medicine modal would show when deleting a medicine
  * Merge pull request #32 from RyanNerd/fix-refresh-med-list
  * :bug: Remove unneeded and buggy code from RefreshMedicineList
  * :bug: Fix RefreshMedicineList
  * Continued TypeScript conversion
  * Merge pull request #31 from RyanNerd/typescript
  * :art: Start on the path of using TypeScript
  * :package: Updated to use the latest create-react-app
  * :package: Add support for TypeScript
  * Merge pull request #30 from RyanNerd/med-alert
  * :sparkles: Alert message for last time med was taken
  * :art: Fix DocBlocks and remove an unneeded CSS file
  * Update README.md
  * Work-around for weird bug in projection for deleting medicine
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for Deleting a medicine
  * BUGFIX: When adding new resident the medicineList and activeMedicine are cleared
  * RefreshMedicineList now uses search() instead of query() so order_by can be used.
  * Refresh of drug history/log for unTrashed residents and a fix for delete dialog only working once.
  * Added logic to restore inactive residents
  * Merge pull request #25 from RyanNerd/remove-delete-medicine-scan-tab
  * Removed the Delete Medicine button on the MedicinePage
  * Merge pull request #22 from RyanNerd/manage-medicine-barcode
  * Remove subdomain from authentication request
  * Merge pull request #16 from RyanNerd/bacode-refresh
  * Refresh barcode image if the barcode changes
  * Merge pull request #15 from RyanNerd/new-resident-become-active
  * If an existing resident is edited/changed or added make that the ActiveResident
  * Clear barcode when barcode not recognized (after an add or if add is cancelled)
  * Resident DOB for Nov(11) not allowing anything more than 28
  * Add blank EOL to ResidentEdit
  * ResidentGrid columns have LastName FirstName now
  * Fix date verification code
  * Merge remote-tracking branch 'origin/master'
  * Fixed bug when deleting medicine would crash
  * Git ignore the lock files so we don't need to deal with them in production.
  * Added some valdation to ResidentEdit
  * Moved TODO items as issues in Github.
  * Split MediciineListGroup as it's own component to simplify MedicinePage
  * Fixed barcode update issue
  * Added FillDate fields to the MedicineEdit
  * Added barcode and fixed error when no residents exist.
  * Allow deleting medicine
  * Fixed adding new medicine from ManageDrug page
  * Prepped ResidentPage for 'Show Deleted'
  * Fixed a bug when medicine was added on the fly when a barcode is not found
  * Rearranged Medicine edit and delete buttons on Medicine page
  * Removed Chrome Requirement
  * Refactored AddNewMedicineButton into its own component
  * ManageDrugs proof of concept
  * DrugLogGrid layout style changes
  * DrugHistoryPage
  * DrugHistory proof of concept completed
  * Fixed a cosmetic issue in DrugLogGrid as well as updated Reactn in `package.json`
  * MedicineLog now contains ALL history for ALL drugs and is filtered in DrugLogGrid
  * Save progress (proof of concept for window popup)
  * More error handling
  * onError handling via catch() in MedicinePage
  * onError handling
  * Changed text color to blue for Dialog box when a barcode not found
  * Dialog box when a barcode not found
  * DocBlocks for MedicinePage
  * Added delete drug log record feature and fixed a problem when cancelling delete drug.
  * Fixed problem with drug log not updating properly when a new drug was added.
  * Added browserInfo function and moved InitialState.js into the utility directory
  * favicon
  * Use .env to indicate API base url and if development
  * Remove useless code from Frak
  * Small update to the README
  * Update README.md with a better description of this project.
  * ProviderBase preliminary code
  * Document Providers
  * Added logic to delete a Resident
  * Removed the forced uppercase
  * Made drugLogList a global
  * When a resident is selected from the resident list and they have medicine the first one in the list will become the activeDrug
  * Logging of Drugs Modal and POST logic added.
  * Logging of Drugs almost complete
  * Delete functionality, ConfirmationDialog, and InformationDialog components
  * Even more Additional MedicinePage layout changes
  * Additional MedicinePage layout changes
  * MedicinePage layout changes
  * Fix security issue with lodash
  * Preliminary work to get MedicineEdit modal up and running.
  * Some clean up in index.js and index.html
  * Save modal update/save changes.
  * Save modal edit changes.
  * Fix security vulnerability in lodash.
  * Merge pull request #1 from RyanNerd/remove-barcode-as-a-bound-global
  * Make barcode value NOT a global
  * Make barcode value NOT a global
  * Some Refactoring and bug fixes
  * ResidentPage use setGlobal instead of useGlobal for setting state only.
  * Add documentation to LoginPage \ MedicinePage
  * Add documentation to LoginPage \ MedicinePage
  * Fix Linting warnings
  * MedicinePage get barcode and dropdown working again.
  * MedicinePage refactoring
  * LoginPage cosmetic changes
  * Conditional logic for display of drug card
  * Moved quite a bit of logic to MedicinePage
  * Proof of concept for MedicinePage
  * Added Delete (layout only) for Resident List
  * Refactored the Resident Table into it's own component ResidentGrid
  * ResidentEdit modal added
  * Additional features added
  * Build out ScanPage a bit more
  * Save Progress
  * Save Progress
  * ResidentList global populated at login without error this time
  * ResidentList global populated at login
  * Save progress
  * Save progress
  * Save progress
  * Save progress
  * remove .babelrc
  * Initial commit from Create React App
  * 0.10.5
  * Code Cleanup :broom:
  * Improve Client Selection Performance :bullettrain_side:
  * 0.10.4
  * Merge pull request #241 from RyanNerd/239-otc-delete
  * Allow OTC medicine to be deleted :bomb:
  * 0.10.3
  * Merge pull request #238 from RyanNerd/237-modal-improvements
  * Modal Improvements
  * Code Improvements for MedicineEdit
  * 0.10.2
  * Refactored the Checkout All Meds confirm modal
  * 0.10.1
  * Fix :wrench: inactive meds showing up in dropdown
  * 0.10.0
  * Merge pull request #235 from RyanNerd/198-soft-delete-medicine
  * Allow Medication to be Deleted :bomb:
  * Change tsconfig.json to not include comments :notebook: in the output
  * Code Clean Up :broom: `` - Use ` `${variable}` ` instead of string concatination - Moved TooltipContainer.tsx to a Container directory under Pages
  * Fix :wrench: problems found with inspections
  * MedicineDrugPage UI Improvement :lipstick:
  * MedicineEdit UI Improvements :lipstick:
  * UI :lipstick: Improvements for `<Confirm.Modal>`
  * Change how the search text is ClientPage is handled
  * 0.9.8
  * 0.9.7
  * ResidentGrid => ClientGrid Name change
  * Fix :wrench: Med Labels from Client dropdown printing all clients
  * 0.9.6
  * Merge pull request #234 from RyanNerd/224-inactive-meds-in-pillbox-item-grid
  * Fix :wrench: PillboxItemGrid showing inactive meds
  * Merge pull request #233 from RyanNerd/231-deconstruct-props-manage-drug-page
  * ManageDrugPage Improvements :sparkle:
  * 0.9.5
  * Confirm component Enhancement :sparkler:
  * 0.9.4
  * Merge pull request #232 from RyanNerd/227-conslidate-confirms
  * Consolidation of confirm modals
  * 0.9.3
  * Merge pull request #226 from RyanNerd/225-active-field-otc
  * UI change for Manage Rx and Manage OTC
  * Merge pull request #221 from RyanNerd/216-client-object
  * Get confirmation for checkout all if there are exiting checked out meds
  * MedicineEdit Improvements :sparkler:
  * Fixed a :bug: bug where if all medications are inactivated the Med dropdown would be empty showing the last active medication
  * - Changed the name of the `Client` type to `TClient` and moved it into global.d.ts - Added some documentation in RecordTypes.ts
  * Use a Client object that contains all the data for the client
  * Prevent tooltip from showing in printout for checkout all feature
  * Merge branch 'no-toast-printed'
  * 0.9.2
  * Prevent Toasts from showing in printouts
  * 0.9.1
  * Merge pull request #215 from RyanNerd/213-med-dropdown-checkout-indicator
  * UI :lipstick: enhancement for Med Dropdown
  * 0.9.0
  * Tweaking the Checkout All feature UI :lipstick:
  * 0.8.27
  * Remove ; from ManageDrugPage.tsx render
  * Merge pull request #214 from RyanNerd/143-checkout-meds-on-deactivate
  * All Medication Checkout Feature
  * PillPopover Improvements
  * Merge pull request #212 from RyanNerd/211-state-render-med-pb-list-group
  * Fix :wrench: state sync with MedicinePage and PillboxListGroup
  * Fix warnings :warning: in the React console
  * 0.8.26
  * Added `medicineOtcList` constant to MedicinePage
  * Global State moved up for PillboxCard
  * Simplify `gridLists` prop processing
  * 0.8.25
  * Merge pull request #210 from RyanNerd/209-pillbox-log-grid
  * Pillbox components use `gridLists` prop to reduce prop drilling
  * Last of the JSDoc linting rules and fixes :wrench:
  * More JSDoc linting rules and fixes :wrench:
  * 0.8.24
  * JSDoc linting rules and many fixes :wrench:
  * Even More linting settings and fixes
  * 0.8.23
  * More linting settings and fixes
  * Added ``'react-hooks/exhaustive-deps':'error'` to the linter
  * OverlayTrigger has a TS bug :bug: for required attributes, that aren't really required
  * 0.8.22
  * Added some plugins to the linter
  * 0.8.21
  * Merge pull request #206 from RyanNerd/201-show-pillbox-name
  * Show pillbox name in Grids
  * 0.8.20
  * Make it more obvious when in DEV mode
  * 0.8.19
  * Merge pull request #205 from RyanNerd/169-error-boundary
  * Experiment with <ErrorBoundary>
  * Merge pull request #204 from RyanNerd/tslint2eslint-pretty
  * Convert from tslint to eslint and using prettier
  * 0.8.18
  * Make all props in CheckoutGrid required
  * 0.8.17
  * Merge pull request #203 from RyanNerd/202-create-checkout-grid
  * Create CheckoutGrid
  * 0.8.16
  * Added missing hook dependancy
  * 0.8.15
  * Merge pull request #200 from RyanNerd/196-refactor-medlistgroup
  * Pillbox logging and UI Improvements
  * 0.8.14
  * Merge pull request #197 from RyanNerd/195-remove-local-storage
  * Pillbox Remove Local Storage
  * 0.8.13
  * Merge pull request #194 from RyanNerd/pillbox-log-history
  * Pillbox Drug Log History
  * 0.8.12
  * Merge pull request #192 from RyanNerd/190-ui-pillbox-listgroup-improvement
  * Log Pillbox and UI Improvements
  * 0.8.11
  * Only Log Pillbox Items if the medicine is active
  * Add Strength of drug to PillboxListGroup Card
  * History should include inactive drugs
  * 0.8.10
  * Merge pull request #189 from RyanNerd/188-fix-bs
  * BS Color Fix :wrench:
  * Revert "BS Color Fix"
  * BS Color Fix
  * 0.8.9
  * Capitalize Pillbox Name in dropdown
  * Merge pull request #187 from RyanNerd/checkout-badge
  * More Medicine Checkout Improvements
  * Merge pull request #184 from RyanNerd/checkout-badge
  * Add a badge to the Print Checkout buttons
  * Merge pull request #183 from RyanNerd/179-remove-med-checkout-tab
  * Remove Med Checkout Tab
  * Alert pillbox name was not capitalized
  * 0.8.8
  * Merge pull request #181 from RyanNerd/pillbox-ui-improvement
  * Pillbox UI :lipstick: Improvements
  * Merge pull request #180 from RyanNerd/druglog-notes-can-be-null
  * Fix :bug: issue where drugLog.Notes could be null
  * MedicinePage was pitching a fit about importing DrugLogHistory.tsx so this got renamed to MedDrugLogHistory.tsx
  * 0.8.7
  * Merge pull request #178 from RyanNerd/177-credentials-need-alert
  * LoginPage wasn't showing alert with failed credentials :lock:
  * Merge pull request #176 from RyanNerd/simple-ifs
  * Reformat :construction_worker: Code in several modules
  * 0.8.6
  * Merge pull request #175 from RyanNerd/manage-rx-toast
  * Add Toast :bread: to ManageDrugPage
  * 0.8.5
  * Merge pull request #174 from RyanNerd/disabled-spinner-children
  * DisabledSpinner UI :lipstick: Improvements
  * Merge pull request #173 from RyanNerd/med-dropdown-subtext
  * Better UI for other drug names in dropdown
  * Merge pull request #172 from RyanNerd/170-medicine-drop-down-other
  * Display Other Drug Names in dropdown
  * 0.8.4
  * Merge pull request #171 from RyanNerd/code-clean-up
  * Code clean up
  * 0.8.3
  * Fixed About.tsx to allow using X to close
  * 0.8.2
  * removal of PopoverButton.tsx as it is unused
  * Add missing type declarations in reactn
  * Merge pull request #168 from RyanNerd/145-remove-apikeyobserver
  * Simplify the login authentication process
  * Simplify About modal
  * Merge pull request #167 from RyanNerd/163-fix-asyncwrapper-ts-errors
  * Fix :wrench: `asyncwrapper()` typing errors
  * Merge pull request #166 from RyanNerd/print-history-formatting
  * Print History Formatting
  * Merge pull request #165 from RyanNerd/more-ui-changes-pillboxlistgroup
  * Redesign UI :lipstick: PillboxListGroup
  * Merge pull request #164 from RyanNerd/pillbox-ui-change
  * Redesign UI :lipstick: PillboxListGroup
  * Suppress TypeScript errors that suddenly became a problem
  * 0.8.1
  * Removal of the unused MedicineDetails grid
  * Merge pull request #161 from RyanNerd/159-create-otclistgroupgrid
  * Create a grid specifically for OtcListGroup
  * Merge pull request #160 from RyanNerd/157-create-manageotcgrid
  * Create a grid specifically for ManageOtcPage
  * Merge pull request #158 from RyanNerd/147-add-search-manage-otc
  * Add Search :mag: Textbox to Manage Otc Tab
  * Merge pull request #156 from RyanNerd/154-refactor-druglog-grid
  * Refactor Drug History
  * Merge pull request #155 from RyanNerd/152-drug-history-rx-tab
  * Add History Radio Button to Rx tab - Factored out the meat of DrugHistoryPage into DrugHistory.tsx - DrugHistoryPage and MedicinePage use DrugHistory for display of drug log history and print - Added "(OTC)"" to the DrugLogGrid indicating an OTC drug log - Memoized DrugHistoryPage in the LandingPage to reduce re-renders
  * Merge pull request #153 from RyanNerd/149-remove-the-drug-log-table-from-manag
  * Remove Drug Log table from ManageDrugPage
  * Reorganization and Toast own component
  * Merge pull request #151 from RyanNerd/fix-checkout-drug-history
  * Show checkouts in drug log history
  * Merge pull request #150 from RyanNerd/performance
  * Performance :runner: enhancements
  * Performance :runner: enhancement
  * 0.8.0
  * Merge pull request #142 from RyanNerd/pillbox-full-feature
  * UX :bar_chart: Improvement
  * UI :lipstick: improvement
  * Toasts UI :lipstick: improved
  * Limit the DrugLogList to the last 5 days
  * Experimental hook for checking idle
  * - Improved the performance of the pillboxMedLog[] -
  * UI :lipstick: Improvements
  * PillboxListGroup takes children as a prop
  * Pillbox Display
  * PillboxListGroup.tsx changes
  * Code clean up
  * Removal of ClientObserver.ts
  * Removal of the PillboxObserver.ts
  * Removal of the PillboxItemObserver.ts
  * Removal of the DrugLogObserver.ts
  * Code clean up - Remove unneeded `e: React.MouseEvent<HTMLElement>` arguments in MedicineDetail.tsx and components that use it. - Moved the todo: add search box to Manage OTC from comment to an issue - Fixed a bug where even if cancel was chosen do delete an OTC drug the drug would get deleted anyway.
  * Print Medicine Checkout
  * - Change import for react-bootstrap to use direct imports for all components - When the OTC search textbox is cleared the `activeOtc` gets set to null. This was causing visual sync up issues. The search text would be set to an empty string but the selected drug would still be active.
  * Many changes
  * Make multiSort() generic
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * Refactoring
  * Fix :wrench: some UI :bug: bugs
  * More UI :lipstick: on MedicinePage
  * UI :lipstick: Changes
  * Fixing my brain fart
  * Fix :wrench: deleting a drugLog wasn't refreshing the `drugLogList`
  * removed lastTaken as a useState()/useEffect()
  * Removed `drugLogList` from MedicinePage
  * Merge remote-tracking branch 'origin/pillbox-full-feature' into pillbox-full-feature
  * Attempted a refactor of the async DrugLog
  * UI :lipstick: Change to log buttons
  * UI :lipstick: Change to log buttons
  * Significantly Simplified PillboxListGroup
  * Significantly Simplified PillboxListGroup
  * Refactored some pillbox log history functions
  * Partially fix "update" in the MedicineManager.ts
  * Attempt at getting Log Pillbox functionality
  * Show pillbox items in the med dropdown list
  * = Disable the Pillbox radiobutton if `medicineList` has less than 5 items
  * - OtcListGroup search textbox autoFocus - The MedicineDetail grid row will appear in bold if selected
  * Minor code clean up in MedicinePage.tsx
  * Simplified OtcListGroup
  * Flatten and sort all imports
  * - Fixed a missing useEffect dependency in MedicinePage.tsx - Flattened imports   - See: https://dev.to/nilanth/no-more-import-in-react-2mbo
  * Remove `activeClient` global
  * Manage activeMed state better when adding med
  * Keep state of activeMed when drugs are logged
  * :broom: Clean up code
  * Move all PillboxPage.tsx into PillboxListGroup.tsx - Moved the logic from PillboxPage as a landing page item instead making it a ListGroup item - Fixed a bug in `getPillboxItemS()` where the filter wasn't including the `pillboxId` - Removed the PillboxPage from the LandingPage - Added PillboxCard.tsx as a more feature rich PillboxItemGrid - MedicinePage.tsx updated to use PillboxListGroup new features and PillboxCard - PillboxItemGrid.tsx :building_construction:  scaffolding added for click on row functionality - PillboxListGroup.tsx placeholder replaced with actual logic and features :atom_symbol: - Destroyed :bomb: PillboxPage.tsx - Destroyed :bomb: MedicineListGroup.tsx
  * - Set initial state of `activeMed`, `activeOtc` & `activePillbox` by using `usePrevious()` hook. - Changed `LIST_TYPE` to `DISPLAY_TYPE` and added a Print to the enum. - Removal of the `<Collapse>` component in OtcListGroup.tsx - Conditional rendering fixed and updated in MedListGroup.tsx - LandingPage.tsx documentation updated
  * Moved state back down to components in LandingPage
  * Major :ringed_planet: :construction_worker: Overhaul of MedicinePage - MedicinePage can now be in one of three states:   1. Medicine - select and log prescriptions   2. OTC - Select and log OTC drugs   3. Pillbox - Select a pill box and log drugs therein - Complete UI :lipstick: redesign for MedicinePage.tsx - MedListGroup changed to **only** handle prescriptions (was handling pillbox and drugs -- needed separation of concerns) - Removed Show/Hide OTC buttons in OtcListGroup - Added PillboxListGroup.tsx - Added radio buttons Medicine, OTC, and Pillbox to let user set state. - OtcList global moved to LandingPage.tsx and passed into MedicinePage.tsx
  * - Minor code clean-up in About.tsx - ActiveResidentObserver.ts uses the `usePrevious()` hook now. - ApiKeyObserver.ts uses `asyncWrapper()` for better error control. - Minor code clean-up in ConfirmDialogModal.tsx - Very minor code clean-up in ErrorDetailsObserver.ts (removed a space) - Added function getPillboxItems.ts so MedicinePage.tsx and PillboxPage.tsx can share code. - Added `IPillboxItemObserver` interface to global.d.ts - Some code clean-up for LandingPage.tsx as well as some todos. Also `<PillboxPage>`` takes additional attributes passed in from LandingPage. - Minor code clean-up in MedDropdown.tsx - Added `<PillboxItemGrid>` to be displayed when the selected activeId is a pillbox. - Code clean-up for MedListGroup.tsx  - `<TooltipButton>` replaced with a standard `<Button>`  - Removed `tooltipText()` since it was displaying with the `<ToolTipButton>` anyway  - Added a + Log ALL Drugs in Pillbox button (not currently functional - PillboxItemGrid.tsx uses getPillboxItems.ts to build out the `PillRows. Some code clean-up. - Code clean-up in PillboxItemObserver.ts - PillboxPage.tsx   - Added props refresh for `pillboxItemList`, `pillboxList`, and `activePillbox`   - Use `getPillboxItems()` to fetch `PillboxItemRows` - Added a `usePrevious()` hook.
  * - Continued the overhaul of MedicinePage.tsx to use MedListGroup.tsx and support pillboxes. activeId is used instead of activeDrug. - Moved state from MedDropdown.tsx for the buildout of the listItems to MedListGroup.tsx. This solved a bunch of issues. - Removed the `medicineList` and `pillboxList` from MedDropdown.tsx replacing them with an `itemList` prop that comes from the MedListGroup.tsx solving a bunch of issues.
  * - Added `React.StrictMode` to all things ` <LandingPage>` :small_airplane: - Moving state up to the LandingPage.tsx for global lists. - Starting on the major revamp of MedicinePage.tsx so that it can support Pillboxes - MedListGroup.tsx created to replace MedicineListGroup.tsx - MedDropdown.tsx replaces MedicineDropdown.tsx - Minor :lipstick: cosmetic changes to PillboxEdit.tsx - Minor :lipstick: changes in PillboxPage.tsx
  * - :lipstick: Code Formatting
  * - :lipstick: UI formatting for the `TabPane` in PillboxPage.tsx   - The `Card.Title` now has a formatted pillbox name that looks similar to the selected `Nav` item.   - Added some text to help users know how to determine what is in the selected pillbox - Added Bootstrap color enumerator `BsColor` to common.ts - Both PillboxPage.tsx and PillboxItemGrid.tsx use `BsColor` enum
  * - Quantity selection in PillboxItemGrid.tsx is now a dropdown split button - Scaffolding set up for `onEdit()` handling in PillboxPage.tsx
  * - Significantly changed how PillboxItemGrid.tsx works by:    - sorting on Quantity, Drug    - Removed :boom: delete button    - Added small buttons of + qty    - All medicines for the client are displayed in the grid - PillboxPage.tsx changed to handle the new signature of PillboxItemGrid.tsx - Added _multiSort()_ function in common.ts to handle multiple column sorting.
  * 0.7.2
  * Merge pull request #141 from RyanNerd/manage-rx-row-size
  * UI :lipstick: fix :wrench: for ManageRx tab
  * 0.7.1
  * Fix a regression :bug: in MedicineEdit.tsx
  * Merge pull request #139 from RyanNerd/active-switch
  * 0.7.0
  * Medicine Active checkbox and Other drug names
  * 0.6.1
  * - When coping a the client name to the clipboard use the format FirstName LastName (was Lastname, FirstName) - Spelling fix in DiagnosticPage.tsx
  * Merge pull request #136 from RyanNerd/pillbox
  * 0.6.0
  * Search criteria signature change
  * Search criteria signature change
  * Dependency version & Diagnostics
  * Merge pull request #133 from RyanNerd/client-dropdown-minor-change
  * 0.5.1
  * Client dropdown addition
  * Version bump
  * Merge pull request #132 from RyanNerd/108-force-print-dialog-when-a-new-client
  * When adding new client show print dialog
  * Merge pull request #131 from RyanNerd/129-when-the-system-crashes-the-client-n
  * When ErrorDetails displayed unset ActiveResident
  * Fix a minor spelling error in code comments
  * Merge pull request #130 from RyanNerd/124-change-how-name-button-popover-works
  * Revamp the client name and DOB buttons
  * Merge pull request #128 from RyanNerd/121-notes-and-directions-for-packs-
  * For DrugHistory use a combo of Notes & Directions
  * Chage link text in About.tsx for issues - Closes #125
  * Updated the docblock for `clientFullName()` in common.ts
  * Merge pull request #127 from RyanNerd/nick-name
  * Nickname added to client / resident
  * Merge pull request #120 from RyanNerd/119-validate-client-dob-is-not-in-the-fu
  * Prevent DOB set in future
  * Merge pull request #118 from RyanNerd/112-medicineedit-fill-date-validation-
  * Prevent future Fill Date when editing Medicine
  * Merge pull request #117 from RyanNerd/109-change-isdayvalid-ismonthvalid-and-i
  * isYear, isDay, and isMonth Valid signature change
  * 0.4.5
  * npm run build exports memory limit before running
  * Small update to README.md
  * Merge pull request #116 from RyanNerd/115-clicking-on-client-dob-button-should
  * Launch edit modal for active client when DOB button clicked
  * Merge pull request #114 from RyanNerd/110-figure-out-why-the-medicineedit-moda
  * Fix 🔧 display issue with MedicineEdit.tsx
  * Merge pull request #113 from RyanNerd/tweak-fill-date-validation
  * Medicine Fill Date 📅 validation 👮
  * Merge pull request #111 from RyanNerd/fix-fill-date
  * Add Fill Date validation 👮
  * Merge pull request #107 from RyanNerd/quack-quack-die
  * Remove 🦆 typing from ManageDrugPage.tsx
  * Merge pull request #106 from RyanNerd/druglog-edit-validation
  * - Consolidated `getDrugName()` in common.ts - Code clean-up 🧹
  * Don't show Out or In fields in DrugLogEdit if OTC
  * Removed a todo that was done
  * Merge pull request #101 from RyanNerd/spinner-observer
  * Add spinner to indcate when system is busy
  * Add spinner 🎡 to Medicine Dropdown when disabled
  * Merge pull request #100 from RyanNerd/observer-finally
  * Use `finally()` in observer promises
  * Delay before invoking print dialog for ClientRoster
  * LoginPage 👷 Rework
  * 0.4.4
  * Merge pull request #99 from RyanNerd/login-flair
  * LoginPage 👷 Rework
  * Clean-up 🧹 code and documentation
  * Version Modal Additions
  * 0.4.3
  * Determine the version via npm env
  * 0.4.2
  * Merge pull request #98 from RyanNerd/revamp-otc
  * Revamp 💄 👷 OTC ListGroup
  * 0.4.1
  * Merge pull request #97 from RyanNerd/fix-dupe-client-issue
  * Fix  Resident record dupe problem
  * 0.4.0
  * Merge pull request #96 from RyanNerd/client-notes
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * 0.3.18
  * Fix 🔧 + OTC and Edit OTC buttons from bleeding through
  * Merge pull request #95 from RyanNerd/version-update
  * Version updates in package.json
  * Add useStickyState hook for possible future use
  * More code changes to TooltipButton
  * Fix missing required attributes in TooltipButton
  * Get rid of the useless @constructor in JSDOC headers
  * Get rid of the useless @constructor JSDOC
  * Merge pull request #94 from RyanNerd/about-page
  * 0.3.17
  * Add About Modal
  * Merge pull request #93 from RyanNerd/client-name
  * 0.3.16
  * Client name and DOB headers are separate buttons
  * Merge pull request #92 from RyanNerd/fix-client-name-update
  * 0.3.15
  * Fix 🔧 ActiveResident global not getting updated when client info updated
  * Merge pull request #91 from RyanNerd/client-printout
  * 0.3.14
  * Add Feature to Print Client Roster
  * 0.3.13
  * Merge pull request #90 from RyanNerd/client-roster
  * Add Feature to Print Client Roster
  * Merge pull request #89 from RyanNerd/fix-drug-log-edit
  * 0.3.12
  * 🔧 Fixed DrugLogEdit
  * Merge pull request #88 from RyanNerd/bulk-med-checkout
  * 🔧 Fixed Print Medicine Checkout in Manage Rx tab
  * Merge pull request #87 from RyanNerd/bulk-med-checkout
  * 0.3.11
  * Log Drug from Manage Rx tab
  * 💄Log Drug from Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * 💄Add bulk checkout to Manage Rx tab
  * Date.toLocaleString() TS fix
  * Merge pull request #86 from RyanNerd/otc-in-rx-page
  * 0.3.10
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab combines OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and prescription logging
  * :lipstick: Rx tab has both OTC and medical logging
  * Merge pull request #82 from RyanNerd/show-client-print
  * Add client name and DOB to DrugHistoryPage print area
  * 0.3.9
  * Merge pull request #81 from RyanNerd/get-version-from-package.json
  * Use package.json to obtain version
  * Merge pull request #80 from RyanNerd/fix-print-margins
  * Fix print margins
  * Merge pull request #79 from RyanNerd/fix-drug-history-print
  * Allow the printing of the client name in DrugHistoryPage
  * Bumped up RxChart version in package.json
  * Added Out and In columns to MedicinePage drug log grid
  * Merge pull request #78 from RyanNerd/no-print
  * Print MedicineCheckout Enhancements and 🔧 Fixes
  * Merge pull request #77 from RyanNerd/dependancy-version-update
  * Upgrade ⬆ dependency versions
  * Merge pull request #76 from RyanNerd/disable-login-field-empty
  * Disable Login button if password or username are empty 🗑
  * Merge pull request #75 from RyanNerd/base-url-error-message
  * Display error message if .env is missing or BASEURL isn't set
  * Bumped the version in package.json
  * 💊 Medicine Checkout Feature
  * Merge pull request #74 from RyanNerd/medicine-checkout-feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💊 Medicine Checkout Feature
  * 💥 Remove `<any>` type
  * ♻ Refactor Validation 👮 code into its own 📁
  * 🔧 Fix `drawBarcode()` to verify the canvas element exists before trying to draw the barcode
  * 💊 OtcPage.tsx
  * 💊 MedicinePage
  * 💊 MedicinePage
  * 💊 MedicinePage 🐛 fix
  * 🔨 Fix pressing enter in search textbox causes app to reset.
  * 🔧 Fix NPM dependency ➕
  * Revert tsconfig.json
  * tsconfig.json is pitching a 😠 fit
  * Removed the development 🙈 requirement for the DiagnosticPage.tsx
  * Merge pull request #73 from RyanNerd/disable-log-buttons
  * 🎇 Added disable feature to the log buttons
  * ⬆ Upgraded dependencies
  * 0.3.5
  * 0.3.4
  * Merge pull request #72 from RyanNerd/fix-scroll-to-modal
  * Removed scrollTop feature from all tab pages
  * Merge pull request #71 from RyanNerd/prevent-client-dupe
  * ResidentManager fixed 🔧 to prevent dupes
  * ♻ setApi() changed to emit a promise - Loading of client records, OTC records now only happens AFTER the apiKey is set for ALL providers. - Discourse on the Observer middleware architecture is exhastively commented in App.tsx
  * Consolidation 🧑‍🤝‍🧑 of the AuthObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the OtcMedicineObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the DrugLogObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the MedicineObserver 🔭
  * Merge pull request #70 from RyanNerd/observer-consolidation-client
  * Consolidation 🧑‍🤝‍🧑 of the ClientObserver 🔭
  * Added `logout` as a global 🌎 hook 🎣
  * 💄UI Improvements in MedicinePage
  * :boom: removed `console.log()` from UpdateClientObserver.ts
  * ♻ When a new client is added make that client active
  * 💥 Removal of Search box from MedicinePage
  * Merge pull request #69 from RyanNerd/code-reformatting
  * - 💄Code formatting for multiple modules
  * - 💄JSDoc  and code formatting changes
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * Merge pull request #67 from RyanNerd/otcpage-using-table
  * 💄 UI for OtcPage changed to list 📜 OTC drugs in a table
  * Fix 🔧 a minor linting problem
  * Add Search 🔍 Validation
  * ♻ Refactored <LogButtons> into its own component
  * Added Log button stack to the ListGroup
  * 🚘 In progress - OtcPage using table instead of MedicineListGroup
  * 💄 Changed Tab order in LandingPage.tsx
  * Merge pull request #66 from RyanNerd/hooks-4-updates
  * OtcPage now uses declarative hooks 🎣 for updates and delete processing
  * 💄A little bit of code clean-up 🧹
  * A couple of hooks 🎣 added for OTC
  * 💄Code formatting and adding better comment 💬 headers
  * ♻ Refactoring
  * `login` is now a global 🌎 hook 🎣 that is set to the `{username, password}` when a user logs in.
  * `refreshOtc` is now a hook 🎣 trigger 🔫 for when the otcList needs to be refreshed.
  * - `deleteMedicine` is now a hook 🎣 trigger 🔫 for when a MedicineRecord is to be deleted. - 💄Reorganized the code in App.tsx
  * - `deleteDrugLog` is now a hook 🎣 trigger 🔫 for when a DrugLogRecord is to be deleted. - Fixed a 🐛 in the DiagnosticPage where `CloseErrorButton` wasn't inside the `useMemo()` - Changed MedicineManger, MedicinePage, and OtcPage with how it handles deletes in prep for the next salvo of changes.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Merge remote-tracking branch 'origin/hooks-4-updates' into hooks-4-updates
  * 🎣 App.tsx is the single source of truth via hooks 🔧 Fixed a problem when the medicine dropdown changes the selection would revert back to the original value.
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 💄Code format changes
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * 🎣 App.tsx is the single source of truth via hooks
  * Add ShadowBox 🔲 to Directions in MedicineListGroup - Just for flare's 🌈 sake
  * Merge pull request #65 from RyanNerd/toggle-switch
  * Merge pull request #64 from RyanNerd/shadow-box
  * Add ShadowBox 🔲
  * Add ToggleSwitch 💡
  * 🔧 Fixed the double underline for the medicine link ⛓
  * 💄Add link ⛓ on MedicinePage for drugs 💊 - Added some flair 🌈 to the link via CSS - Link uses [GoodRx](https://goodrx.com)
  * Merge pull request #63 from RyanNerd/react-upgrade-workaround
  * 🔧 Work-around a 🐛 with ⚛ React 17 and DropdownButton - See: https://github.com/react-bootstrap/react-bootstrap/issues/5409 - The work around is here: https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584 - package.json was changed to bring in React ⚛ v17.0.1
  * Add support for Willow 🌳 API error handling - ♻ Refactored DiagnosticPage by adding <CloseErrorButton> reusable component - 🌳 Willow API error parsing added to DiagnosticPage.tsx
  * ♻ Refactoring to import using reactn when possible
  * Merge pull request #62 from RyanNerd/error-state-logout
  * Disable Login page when there is an error
  * 🥅 DiagnosticPage now resets correctly when dismissed - Changed order of operations with LoginPage when testing errors. - Changed LandingPage handling `dismissErrorAlert()` to set global state back to initial values.
  * 🎨 Change activeTabKey state to be string only
  * 💄Added Log 3 & log 4 buttons - Buttons added to MedicineListGroup, MedicinePage, and OtcPage - Added scroll to top for all pages when that page becomes active (except for the LandingPage as that page is always active whem the app starts)
  * Add 📜 Scroll-to-top logic in the ResidentPage when it becomes active
  * 💄When a resident is selected reset the search textbox to an empty string. After a resident is selected when the user returns to the ResidentPage tab typically they are looking to select a different resident or add one and reseting the search textbox to empty string shows the entire resident list.
  * 💄More code formatting in ResidentPage
  * 💄Code formatting 🔨 fix in ResidentPage
  * Merge pull request #61 from RyanNerd/resident-search
  * Add a search 🔍 filter to ResidentPage
  * 🐟 Upstream merge from master
  * 💄Make the Medicine tab title Rx
  * Add search 🔎 to ResidentPage
  * 💄Make all modals backdrop = ⚡static⚡ Modals can no longer be dismissed by clicking off the modal.
  * Added missing `ResidentId` to DrugLogRecord
  * 💄 ResidentGrid now shows Created and Activated columns as formatted dates
  * 📜 Scroll to the top of the page when MedicinePage is active
  * 🔥Removal of no-namespace rule in tslint.json The previous merge allows this rule to be reestablished as the default
  * Merge pull request #60 from RyanNerd/bwip-js-update
  * 🔥Removal of bwip-js.d.js the 👽📦 updated
  * :rotating_light: Added `tslint-react-hooks` to the linter
  * ♻ Refactored ✈LandingPage and  ⚕DrugHistoryPage ⚕DrugHistoryPage now uses globals instead of props Single responsiblity.
  * ✈ LandingPage uses CSS to bold active tabs This used to be done via a function.
  * 💄Cosmetic changes to LandingPage
  * Merge pull request #59 from RyanNerd/active-tab-key
  * ⚡ Improve performance by only rendering tab content when that tab is active Added the prop `activeTabKey` to a number of Pages and put conditional logic in place to prevent render when that tab isn't the active tab.
  * Minor code format 🔨 fix
  * ♻ Refactor MedicinePage, OtcPage, and DrugLogGrid - Make `getObjectByProperty()` generic - Move `getDrugName()` to common.ts for refactoring.
  * 💡Updated DocBlocks to be more concise Also removed 🔥 unneeded `: void` return types
  * Minor change when adding new resident auto switch to Rx tab
  * Changed `calculateLastTaken` to use Created date instead of Updated.
  * Merge pull request #58 from RyanNerd/api-set-change
  * 🔧 Fixed a problem with the DropDown button The dropdown button would stop working after a modal was opened. After a 🌦 day of pulling my 🦱 out trying to figure out what had happened. Finally found this: https://github.com/react-bootstrap/react-bootstrap/issues/5409 Had to thunk React back down to 16.14.0
  * Changed how APIs get set in the providers
  * Merge pull request #57 from RyanNerd/external-package-upgrades
  * Updated several 📦 packages to the latest version bootstrap.min.css was removed 🔥 from the public folder and the stylesheet link in index.html was also removed index.tsx now imports bootstrap.min.css using the NPM package The following 📦 packages were upgraded: - React ⚛ - bootstrap 💄 - bwup-js - typescript 📜 One package was removed: - react-new-window
  * Merge pull request #56 from RyanNerd/frak-upgrade
  * Update Frak to latest version and 🔧 fix Providers - 👽 Frak package is no longer an object but is now a function. All providers changed accordingly. - Error 🐛 handling was updated in DiagnosticPage since Frak no longer emits a custom error, but ⚾ throws the Response as an error when there is an exception.
  * Merge pull request #55 from RyanNerd/gotta-catch-em-all
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Automatically activate ⚡ the Rx (medicine) when a resident is selected
  * Added a dismiss 🔥 option for `_alert()` allowing users to log back in. Also 🚛 moved `_alert()` into `useMemo()`
  * Add 📃 JSDoc blocks to DiagnosticPage.tsx Also added some additional 🦆 type checking logic
  * Merge pull request #54 from RyanNerd/diagnostics-retool
  * Retooling 🔧 of DiagnosticPage.tsx
  * Merge pull request #53 from RyanNerd/global-error-handling
  * :bug: Error handling is now done via a 🌎 global called `errorDetail` All components in the Page directory no loger call `onError()` but instead now use `errorDetails()` Moved the observer that hides the Diagnostic tab to the DiagnosticPage.tsx 💄Improved the code in DiagnosticPage.tsx to better display errors depending on the type of error. The error prop that DiagnosticPage.tsx receives is of the type `any` so some 🦆 typing logic was added. global.d.ts and getInitialState.ts were 🔝 updated to handle the new global `errorDetail` TODO: Make the DiagnosticPage.tsx use an accordion component when showing details. This will be a future task.
  * ✨ Added code in LandingPage to more cleanly set the tab titles and bold the tab that is active.
  * Merge pull request #52 from RyanNerd/auth-manager
  * ♻ Refactor Providers and establish AuthManager 🗑 Removed ProviderTypes.ts moving the type definitions to the individual providers ✨ Created AuthManager to be consistant with design
  * ResidentPage code clean-up 💄 🗑 Removed `refreshDrugs()` since it was only being called from one place and refactored ♻ the code into the orginal caller.
  * 🔧 Fix ResidentPage which had a recursive 🐛 🗑 Removed the `useEffect()` and replaced it with `refreshDrugs()` upon edit/add/select/delete operations
  * ♻ Refactored all the .tsx files in the Pages directory to the components directory
  * Merge pull request #51 from RyanNerd/autoload-lists
  * Handle resident changes via useEffect to reload 🔃 residentList, medicineList, and drugLogLists ♻ Refactored ResidentManager eliminating 🗑 the complexity
  * Merge pull request #50 from RyanNerd/medicine-manager
  * ♻ Refactored ManageDrugPage, ManageOtcPage, and OtcPage to use the :sparkles: new MedicineManager.ts
  * ♻ Refactored MedicinePage to use :sparkles: new MedicineManager.ts
  * Merge pull request #49 from RyanNerd/current-resident
  * 💄Cosmetic code changes and made providers more logical ♻ Refactored the Providers to take baseUrl as an argument 🗑 Removed baseUrl from the globals
  * ✨ Major ♻ refactoring for Resident bussiness logic  Moved all business logic to a ResidentManager module.
  * More 🚲 Bikeshedding cosmetic 💄 code changes to multiple modules
  * 🚲 Bikeshedding some 💄 cosmetic code changes to MedicineListGroup
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to ResidentGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to MedicineDetail
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to DrugLogGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to TooltipButton
  * :sparkler: Added AuthenticationProvider
  * :rocket: Major revision to providers making them type safe :closed_lock_with_key:
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to OtcPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: Cosmetic code changes to DiagnosticPage
  * :lipstick: Cosmetic code changes to ManageOtcPage
  * :lipstick: Cosmetic code changes to MedicinePage
  * :lipstick: Cosmetic code changes to LoginPage
  * :lipstick: Cosmetic code changes to ResidentPage
  * :lipstick: Cosmetic code changes to LandingPage
  * :lipstick: Cosmetic code changes to ManageDrugPage
  * :lipstick: cosmetic code changes  uses global State as an interface
  * :lipstick: cosmetic code changes in
  * :lipstick: cosmetic code changes defaulting to empty arrays for lists instead of null
  * :scroll: Typing and :lipstick: cosmetic code changes to DrugLogGrid and DrugHistoryPage
  * :lipstick: Cosmetic code changes including an .editorconfig file to enforce style
  * More :lipstick: Cosmetic changes to the code (indentation and other)
  * :lipstick: Cosmetic changes to the code (indentation and others)
  * :sunglasses: Simplfy the providers even more
  * Further reduce the warning noise :loud_sound: in the console log by :wrench: fixing the show prop to be bool
  * Eliminate the warning noise :loud_sound: in the console log by changing onAnswer to onSelect
  * :sunglasses: Simplify all providers to use Frak directly
  * Merge pull request #48 from RyanNerd/frak-npm
  * Use Frak from the NPM :package:
  * :arrow_heading_up: Update React to 16.14.0 and add lint rules for code line length and :wrench: fix modules that violated the new rule.
  * Added tslinter :heavy_check_mark: and updated all code
  * :wrench: Fix code indentation in ResidentGrid
  * :wrench: Fix code indentation in MedicineDetail
  * :sunglasses: Simplify DrugLogGrid
  * :tractor: Moved  into  and some :scroll: typing changes
  * :scroll: Type code changes in common
  * :sunny: Clean up code for the  function
  * tractor: Moved  to common
  * useForceUpdate deleted :wastebasket: as it was not being used. :scroll: Types extended for TooltipButton
  * :wrench: Fix :scroll: typings in MedicineListGroup for logDrug callback
  * :wrench: Fix :scroll: typings in MedicineListGroup for barcode canvas
  * :wrench: Fix :scroll: typings in MedicineListGroup and OtcPage
  * :wrench: Fix the typings in DrugDropdown and MedicineListGroup
  * :lipstick: Make IProps interface definiton more specific in ResidentGrid
  * :lipstick: Center text for Selected column in ResidentGrid
  * :lipstick: Add Reload button in ResidentPage and :wrench: tighten up code
  * :wrench: Fix ResidentPage to use TooltipButton
  * :lipstick: Remove condenced class from the Resident table
  * Code format :lipstick: changes in Frak
  * :sunglasses: Simplify LastTakenButton
  * :lipstick Don't display the LastTakenButton if the lastTaken value is null
  * :wrench: Fix the display :lipstick: of Last Taken (hours)
  * :wrench: Fixed :lipstick: formatting in DrugLogGrid for Drug and Created rows
  * :sunglasses: Simplify bolding in ResidentGrid and DrugLogGrid
  * :lipstick: Made selected resident row bold. :wrench: fixed the drug log grid to show in bold when drug logged today
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :star2: Add missing Doc-Blocks and :wrench: fix a bug in ResidentPage where medicine logs weren't loading
  * :lipstick: Cosmetic changes to Fill Date display
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in MedicinePage
  * :wrench: Fixed error handling in MedHistoryProvider
  * :wrench: Fixed error handling in MedicineProvider
  * :wrench: Fixed error handling in ResidentProvider
  * :wrench: Error handling and added DiagnosticPage to display errors
  * :twisted_rightwards_arrows: Refactor ResidentPage and fix a :bug: in ResidentProvider
  * :wrench: Tightened up code in ResidentPage
  * :lipstick: Make mouse cursor default when the Log 1 / Log 2 buttons are disabled
  * :eight_spoked_asterisk: More changes to the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :eight_spoked_asterisk: Change the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :arrow_heading_up: Upgraded bootstrap.min.css to latest version 4.4.1
  * :rainbow: Changed the color scheme of the DrugLogGrid based on lastTaken
  * :sunglasses: Simplify the LastTakeButton (remove unused props)
  * :cyclone: Major code clean-up
  * :twisted_rightwards_arrows: Refactor DrugLogGrid to use getObjectByProperty()
  * :lipstick: Show drug name in Delete confirmation dialog for OtcPage and MedicinePage
  * :twisted_rightwards_arrows: Refactor deleteDrugLog
  * :sunglasses: Make MedicineDetail a component with props
  * :sunglasses: Make DrugLogGrid more generic
  * :fire: Remove RxTable and use the Table component instead for simplicity :sunglasses:
  * :sunglasses: Make the MedicineDetail more generic
  * :lipstick: Costmetic change make last taken variant color consistant
  * :twisted_rightwards_arrows: More ResidentPage simplification
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :lipstick: Cosmetic change for Delete confirm in ManageOtcPage
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * Fix a :bug: in Confirm and have ManageDrugPage use the new component
  * Create Confirm in the Modals directory as a better more generic ConfirmationDialog
  * Make the ConfirmationDialog more generic :older_man:
  * Add a more prominant warning :warning: when an OTC drug will be deleted
  * Merge pull request #47 from RyanNerd/react-bootstrap-typescript
  * Cosmetic :lipstick: changes to all the tab titles making them bold when active
  * Minor cosmetic :lipstick: code changes
  * :twisted_rightwards_arrows: For consistancy refactor getResidentList
  * :twisted_rightwards_arrows: Refactor remaining refreshList into getLists
  * :twisted_rightwards_arrows: Refactor RefreshMedicineList into getMedicineList
  * Added a :warning: when OTC meds are edited that the change will be for all
  * :twisted_rightwards_arrows: Refactor of ManageOtc, ManageRx, OtcPage, and MedicinePage
  * :beginner: Simplify addEditDrugLog in Medicine and Otc Pages
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage for logging drugs
  * Refactoring of page to Pages
  * :bowtie: Add Log 2 button to MedicineListGroup & fixed a :bug: in OtcPage
  * :bowtie: change layout of OtcPage to better accomidate the drug history grid
  * fix a :bug: with the error handler. Also hide the Diagnostics tab completely when not active
  * :part_alternation_mark: Change how field setFocus works
  * :scroll: TypeScript conversion even more typings and fix an OTC delete bug
  * :scroll: TypeScript conversion even more typings
  * :scroll: TypeScript conversion ResidentProvider typings
  * :scroll: TypeScript conversion ResidentPage fix :bug: DrugLog refresh
  * :scroll: TypeScript conversion ResidentPage typings
  * :scroll: TypeScript conversion More MedicineProvider typings
  * :scroll: TypeScript conversion MedicineProvider typings
  * :scroll: TypeScript clean-up of Frak and elimination of FrakTypes
  * :scroll: Major TypeScript / object conversion for Frak
  * :scroll: TypeScript / object conversion for Frak
  * :scroll: TypeScript conversion Frak
  * :scroll: TypeScript conversion add useProviders() hook
  * :scroll: TypeScript conversion tighten up more code
  * :scroll: TypeScript conversion tighten up code
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for MedicinePage
  * :scroll: TypeScript conversion for ManageOtcPage
  * :scroll: TypeScript conversion for ManageDrugPage
  * :scroll: TypeScript conversion for LoginPage
  * :scroll: TypeScript conversion for RefreshMedicineLog
  * :twisted_rightwards_arrows: Refactor of Provider helpers
  * :scroll: TypeScript conversion for RefreshOtcList
  * :scroll: TypeScript conversion for DeleteMedicine
  * :scroll: TypeScript conversion for RefreshMedicineList
  * :scroll: TypeScript conversion for ResidentProvider
  * :scroll: TypeScript conversion for MedicineProvider
  * :scroll: TypeScript conversion for DrugHistoryPage
  * :scroll: TypeScript conversion for ResidentEdit
  * :scroll: TypeScript conversion for MedicineEdit
  * :scroll: TypeScript conversion :bug: fix for DrugLogEdit
  * :scroll: TypeScript conversion for DrugLogEdit
  * :scroll: TypeScript conversion Fix :wrench: up for ConfirmationDialog
  * :scroll: TypeScript conversion Remove InformationDialog
  * :scroll: TypeScript conversion ConfirmationDialog
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion DrugDropdown
  * :scroll: TypeScript conversion MedicineDetail
  * :scroll: TypeScript conversion DrugLogGrid
  * :scroll: TypeScript conversion ResidentGrid
  * :scroll: TypeScript conversion RxTable
  * :scroll: TypeScript conversion LastTakenButton
  * :scroll: TypeScript conversion for React Bootstrap
  * :curly_loop: Yet even more TypeScript conversions
  * :curly_loop: Even more TypeScript conversions
  * :curly_loop: More TypeScript conversions
  * :curly_loop: Minor TypeScript conversions
  * Merge pull request #46 from RyanNerd/medicine-otc-page-refactor
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage
  * Merge pull request #45 from RyanNerd/otc-feature
  * :lipstick: Even more cosmetic changes & fix to attribute={true} making React mad
  * :lipstick: More cosmetic changes and a subclass of Table
  * :twisted_rightwards_arrows: Refactored LastTakenButton and some cosmetic changes
  * :fountain: Add Log 1 and Log 2 amounts button feature
  * :lipstick: Cosmetic changes
  * :wrench: fixed a minor type :bug: in MedicinePage and OtcPage
  * :zap: Fixed barcode issues and a :bug: in TooltipButton
  * :sunglasses: Fixed the problem with barcodes not showing up correctly
  * :twisted_rightwards_arrows: Convert index.js to index.tsx
  * :star: Change wording in ResidentPage when deleting to 'deactivate'
  * :white_circle: Clean up code in InitialState.tsx
  * Add and fix docblocks
  * :carousel_horse: Work-around for React null handling stupidity
  * :wrench: fixed code in common.js and converted it to common.tsx
  * Tighten up code in MedicineListGroup
  * bwip-js version bump and minor fix to MedicineListGroup
  * Code formatting fixes
  * Tighten up obserer effects in the modals
  * Disable the Save button if the Drug name is empty in the MedicineEdit modal
  * Disable the Save button if Notes are empty in the DrugLogEdit modal
  * Set focus to first name field in the ResidentEdit modal when it is shown
  * Add support for barcodes in search input box
  * Fix OTC Search is valid icon indicator
  * Fix layout problems when there were no medications
  * Tighten some code in MedicinePage
  * Search validation icon logic clean-up
  * Tighten the search useEffect code
  * Handle search matches via useEffect
  * Add docblock to handleMedicineEditModalClose() helper function
  * Refactoring of ManageOtc and ManageDrug pages
  * If enter is pressed on the password textbox then login
  * Add search feature
  * Made sure all MouseEvents had an e.preventDefault()
  * Add PropTypes to remaining components
  * Added PropTypes checking to all pages
  * Convert all functions to arrow functions
  * Fixed an annoying bug where when adding a new resident the medlist wasn't getting cleared
  * Cosmetic fixes and textbox focus feature added
  * Add Manage OTC Page
  * Tightened up some code in MedicinePage and OtcPage
  * A bit of refactoring
  * created a generic TooltipButton replacing the specific AddMedicine button. Also fixed a bug in DrugLogGrid header
  * Removed leftover barcode handling from OtcPage/MedicinePage
  * OtcPage now displays all OTC meds taken in the history
  * Remove setGlobal and use hooks directly instead
  * Convert functions to const
  * Fix problem with OTC meds not showing drug name in DrugHistoryPage
  * Fixed and optimized drugLogList refresh
  * Tweaking things to support OTC -- almost there
  * Removed query and replaced it with search
  * Tightening up code
  * Move Frak() out of the global space
  * remove corrupted InitalState.tsx.sav
  * Save progress
  * Support for OTC
  * Shrink MedicineListGroup in prep for OTC feature.
  * Add DOB to active resident
  * npm package audit fix
  * Fix error when a barcode has no value
  * Merge pull request #43 from RyanNerd/fix-restore-resident
  * Fix medicine log/list not appearing when a resident is restored
  * Merge pull request #42 from RyanNerd/fix-drug-history
  * :bug: Fix drug name not updating on history when edited
  * Merge pull request #41 from RyanNerd/bootstrap-local
  * :sparkles: Make bootstrap.min.css local instead of using a CDN
  * Merge pull request #40 from RyanNerd/organization
  * :sparkles: Organization name now shows when logged in
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * Merge pull request #39 from RyanNerd/embed-barcode-renderer
  * :lock: No longer use the barcode API
  * :lock: Make barcode API call use HTTPS
  * Merge pull request #37 from RyanNerd/typescript-continued-1
  * :art: Merged fix from master that fixes TS errors
  * :art: Fixed the problem with App.tsx throwing TS errors
  * Merge pull request #36 from RyanNerd/resident-color-prod-dev
  * :children_crossing: Resident color changes depending on prod/dev
  * :pencil2: Minor fix to index.js
  * Merge pull request #33 from RyanNerd/fix-delete-med-web-issue-8
  * :bug: Fixed issue where the edit medicine modal would show when deleting a medicine
  * Merge pull request #32 from RyanNerd/fix-refresh-med-list
  * :bug: Remove unneeded and buggy code from RefreshMedicineList
  * :bug: Fix RefreshMedicineList
  * Continued TypeScript conversion
  * Merge pull request #31 from RyanNerd/typescript
  * :art: Start on the path of using TypeScript
  * :package: Updated to use the latest create-react-app
  * :package: Add support for TypeScript
  * Merge pull request #30 from RyanNerd/med-alert
  * :sparkles: Alert message for last time med was taken
  * :art: Fix DocBlocks and remove an unneeded CSS file
  * Update README.md
  * Work-around for weird bug in projection for deleting medicine
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for Deleting a medicine
  * BUGFIX: When adding new resident the medicineList and activeMedicine are cleared
  * RefreshMedicineList now uses search() instead of query() so order_by can be used.
  * Refresh of drug history/log for unTrashed residents and a fix for delete dialog only working once.
  * Added logic to restore inactive residents
  * Merge pull request #25 from RyanNerd/remove-delete-medicine-scan-tab
  * Removed the Delete Medicine button on the MedicinePage
  * Merge pull request #22 from RyanNerd/manage-medicine-barcode
  * Remove subdomain from authentication request
  * Merge pull request #16 from RyanNerd/bacode-refresh
  * Refresh barcode image if the barcode changes
  * Merge pull request #15 from RyanNerd/new-resident-become-active
  * If an existing resident is edited/changed or added make that the ActiveResident
  * Clear barcode when barcode not recognized (after an add or if add is cancelled)
  * Resident DOB for Nov(11) not allowing anything more than 28
  * Add blank EOL to ResidentEdit
  * ResidentGrid columns have LastName FirstName now
  * Fix date verification code
  * Merge remote-tracking branch 'origin/master'
  * Fixed bug when deleting medicine would crash
  * Git ignore the lock files so we don't need to deal with them in production.
  * Added some valdation to ResidentEdit
  * Moved TODO items as issues in Github.
  * Split MediciineListGroup as it's own component to simplify MedicinePage
  * Fixed barcode update issue
  * Added FillDate fields to the MedicineEdit
  * Added barcode and fixed error when no residents exist.
  * Allow deleting medicine
  * Fixed adding new medicine from ManageDrug page
  * Prepped ResidentPage for 'Show Deleted'
  * Fixed a bug when medicine was added on the fly when a barcode is not found
  * Rearranged Medicine edit and delete buttons on Medicine page
  * Removed Chrome Requirement
  * Refactored AddNewMedicineButton into its own component
  * ManageDrugs proof of concept
  * DrugLogGrid layout style changes
  * DrugHistoryPage
  * DrugHistory proof of concept completed
  * Fixed a cosmetic issue in DrugLogGrid as well as updated Reactn in `package.json`
  * MedicineLog now contains ALL history for ALL drugs and is filtered in DrugLogGrid
  * Save progress (proof of concept for window popup)
  * More error handling
  * onError handling via catch() in MedicinePage
  * onError handling
  * Changed text color to blue for Dialog box when a barcode not found
  * Dialog box when a barcode not found
  * DocBlocks for MedicinePage
  * Added delete drug log record feature and fixed a problem when cancelling delete drug.
  * Fixed problem with drug log not updating properly when a new drug was added.
  * Added browserInfo function and moved InitialState.js into the utility directory
  * favicon
  * Use .env to indicate API base url and if development
  * Remove useless code from Frak
  * Small update to the README
  * Update README.md with a better description of this project.
  * ProviderBase preliminary code
  * Document Providers
  * Added logic to delete a Resident
  * Removed the forced uppercase
  * Made drugLogList a global
  * When a resident is selected from the resident list and they have medicine the first one in the list will become the activeDrug
  * Logging of Drugs Modal and POST logic added.
  * Logging of Drugs almost complete
  * Delete functionality, ConfirmationDialog, and InformationDialog components
  * Even more Additional MedicinePage layout changes
  * Additional MedicinePage layout changes
  * MedicinePage layout changes
  * Fix security issue with lodash
  * Preliminary work to get MedicineEdit modal up and running.
  * Some clean up in index.js and index.html
  * Save modal update/save changes.
  * Save modal edit changes.
  * Fix security vulnerability in lodash.
  * Merge pull request #1 from RyanNerd/remove-barcode-as-a-bound-global
  * Make barcode value NOT a global
  * Make barcode value NOT a global
  * Some Refactoring and bug fixes
  * ResidentPage use setGlobal instead of useGlobal for setting state only.
  * Add documentation to LoginPage \ MedicinePage
  * Add documentation to LoginPage \ MedicinePage
  * Fix Linting warnings
  * MedicinePage get barcode and dropdown working again.
  * MedicinePage refactoring
  * LoginPage cosmetic changes
  * Conditional logic for display of drug card
  * Moved quite a bit of logic to MedicinePage
  * Proof of concept for MedicinePage
  * Added Delete (layout only) for Resident List
  * Refactored the Resident Table into it's own component ResidentGrid
  * ResidentEdit modal added
  * Additional features added
  * Build out ScanPage a bit more
  * Save Progress
  * Save Progress
  * ResidentList global populated at login without error this time
  * ResidentList global populated at login
  * Save progress
  * Save progress
  * Save progress
  * Save progress
  * remove .babelrc
  * Initial commit from Create React App

  * 0.10.5
  * Code Cleanup :broom:
  * Improve Client Selection Performance :bullettrain_side:
  * 0.10.4
  * Merge pull request #241 from RyanNerd/239-otc-delete
  * Allow OTC medicine to be deleted :bomb:
  * 0.10.3
  * Merge pull request #238 from RyanNerd/237-modal-improvements
  * Modal Improvements
  * Code Improvements for MedicineEdit
  * 0.10.2
  * Refactored the Checkout All Meds confirm modal
  * 0.10.1
  * Fix :wrench: inactive meds showing up in dropdown
  * 0.10.0
  * Merge pull request #235 from RyanNerd/198-soft-delete-medicine
  * Allow Medication to be Deleted :bomb:
  * Change tsconfig.json to not include comments :notebook: in the output
  * Code Clean Up :broom: `` - Use ` `${variable}` ` instead of string concatination - Moved TooltipContainer.tsx to a Container directory under Pages
  * Fix :wrench: problems found with inspections
  * MedicineDrugPage UI Improvement :lipstick:
  * MedicineEdit UI Improvements :lipstick:
  * UI :lipstick: Improvements for `<Confirm.Modal>`
  * Change how the search text is ClientPage is handled
  * 0.9.8
  * 0.9.7
  * ResidentGrid => ClientGrid Name change
  * Fix :wrench: Med Labels from Client dropdown printing all clients
  * 0.9.6
  * Merge pull request #234 from RyanNerd/224-inactive-meds-in-pillbox-item-grid
  * Fix :wrench: PillboxItemGrid showing inactive meds
  * Merge pull request #233 from RyanNerd/231-deconstruct-props-manage-drug-page
  * ManageDrugPage Improvements :sparkle:
  * 0.9.5
  * Confirm component Enhancement :sparkler:
  * 0.9.4
  * Merge pull request #232 from RyanNerd/227-conslidate-confirms
  * Consolidation of confirm modals
  * 0.9.3
  * Merge pull request #226 from RyanNerd/225-active-field-otc
  * UI change for Manage Rx and Manage OTC
  * Merge pull request #221 from RyanNerd/216-client-object
  * Get confirmation for checkout all if there are exiting checked out meds
  * MedicineEdit Improvements :sparkler:
  * Fixed a :bug: bug where if all medications are inactivated the Med dropdown would be empty showing the last active medication
  * - Changed the name of the `Client` type to `TClient` and moved it into global.d.ts - Added some documentation in RecordTypes.ts
  * Use a Client object that contains all the data for the client
  * Prevent tooltip from showing in printout for checkout all feature
  * Merge branch 'no-toast-printed'
  * 0.9.2
  * Prevent Toasts from showing in printouts
  * 0.9.1
  * Merge pull request #215 from RyanNerd/213-med-dropdown-checkout-indicator
  * UI :lipstick: enhancement for Med Dropdown
  * 0.9.0
  * Tweaking the Checkout All feature UI :lipstick:
  * 0.8.27
  * Remove ; from ManageDrugPage.tsx render
  * Merge pull request #214 from RyanNerd/143-checkout-meds-on-deactivate
  * All Medication Checkout Feature
  * PillPopover Improvements
  * Merge pull request #212 from RyanNerd/211-state-render-med-pb-list-group
  * Fix :wrench: state sync with MedicinePage and PillboxListGroup
  * Fix warnings :warning: in the React console
  * 0.8.26
  * Added `medicineOtcList` constant to MedicinePage
  * Global State moved up for PillboxCard
  * Simplify `gridLists` prop processing
  * 0.8.25
  * Merge pull request #210 from RyanNerd/209-pillbox-log-grid
  * Pillbox components use `gridLists` prop to reduce prop drilling
  * Last of the JSDoc linting rules and fixes :wrench:
  * More JSDoc linting rules and fixes :wrench:
  * 0.8.24
  * JSDoc linting rules and many fixes :wrench:
  * Even More linting settings and fixes
  * 0.8.23
  * More linting settings and fixes
  * Added ``'react-hooks/exhaustive-deps':'error'` to the linter
  * OverlayTrigger has a TS bug :bug: for required attributes, that aren't really required
  * 0.8.22
  * Added some plugins to the linter
  * 0.8.21
  * Merge pull request #206 from RyanNerd/201-show-pillbox-name
  * Show pillbox name in Grids
  * 0.8.20
  * Make it more obvious when in DEV mode
  * 0.8.19
  * Merge pull request #205 from RyanNerd/169-error-boundary
  * Experiment with <ErrorBoundary>
  * Merge pull request #204 from RyanNerd/tslint2eslint-pretty
  * Convert from tslint to eslint and using prettier
  * 0.8.18
  * Make all props in CheckoutGrid required
  * 0.8.17
  * Merge pull request #203 from RyanNerd/202-create-checkout-grid
  * Create CheckoutGrid
  * 0.8.16
  * Added missing hook dependancy
  * 0.8.15
  * Merge pull request #200 from RyanNerd/196-refactor-medlistgroup
  * Pillbox logging and UI Improvements
  * 0.8.14
  * Merge pull request #197 from RyanNerd/195-remove-local-storage
  * Pillbox Remove Local Storage
  * 0.8.13
  * Merge pull request #194 from RyanNerd/pillbox-log-history
  * Pillbox Drug Log History
  * 0.8.12
  * Merge pull request #192 from RyanNerd/190-ui-pillbox-listgroup-improvement
  * Log Pillbox and UI Improvements
  * 0.8.11
  * Only Log Pillbox Items if the medicine is active
  * Add Strength of drug to PillboxListGroup Card
  * History should include inactive drugs
  * 0.8.10
  * Merge pull request #189 from RyanNerd/188-fix-bs
  * BS Color Fix :wrench:
  * Revert "BS Color Fix"
  * BS Color Fix
  * 0.8.9
  * Capitalize Pillbox Name in dropdown
  * Merge pull request #187 from RyanNerd/checkout-badge
  * More Medicine Checkout Improvements
  * Merge pull request #184 from RyanNerd/checkout-badge
  * Add a badge to the Print Checkout buttons
  * Merge pull request #183 from RyanNerd/179-remove-med-checkout-tab
  * Remove Med Checkout Tab
  * Alert pillbox name was not capitalized
  * 0.8.8
  * Merge pull request #181 from RyanNerd/pillbox-ui-improvement
  * Pillbox UI :lipstick: Improvements
  * Merge pull request #180 from RyanNerd/druglog-notes-can-be-null
  * Fix :bug: issue where drugLog.Notes could be null
  * MedicinePage was pitching a fit about importing DrugLogHistory.tsx so this got renamed to MedDrugLogHistory.tsx
  * 0.8.7
  * Merge pull request #178 from RyanNerd/177-credentials-need-alert
  * LoginPage wasn't showing alert with failed credentials :lock:
  * Merge pull request #176 from RyanNerd/simple-ifs
  * Reformat :construction_worker: Code in several modules
  * 0.8.6
  * Merge pull request #175 from RyanNerd/manage-rx-toast
  * Add Toast :bread: to ManageDrugPage
  * 0.8.5
  * Merge pull request #174 from RyanNerd/disabled-spinner-children
  * DisabledSpinner UI :lipstick: Improvements
  * Merge pull request #173 from RyanNerd/med-dropdown-subtext
  * Better UI for other drug names in dropdown
  * Merge pull request #172 from RyanNerd/170-medicine-drop-down-other
  * Display Other Drug Names in dropdown
  * 0.8.4
  * Merge pull request #171 from RyanNerd/code-clean-up
  * Code clean up
  * 0.8.3
  * Fixed About.tsx to allow using X to close
  * 0.8.2
  * removal of PopoverButton.tsx as it is unused
  * Add missing type declarations in reactn
  * Merge pull request #168 from RyanNerd/145-remove-apikeyobserver
  * Simplify the login authentication process
  * Simplify About modal
  * Merge pull request #167 from RyanNerd/163-fix-asyncwrapper-ts-errors
  * Fix :wrench: `asyncwrapper()` typing errors
  * Merge pull request #166 from RyanNerd/print-history-formatting
  * Print History Formatting
  * Merge pull request #165 from RyanNerd/more-ui-changes-pillboxlistgroup
  * Redesign UI :lipstick: PillboxListGroup
  * Merge pull request #164 from RyanNerd/pillbox-ui-change
  * Redesign UI :lipstick: PillboxListGroup
  * Suppress TypeScript errors that suddenly became a problem
  * 0.8.1
  * Removal of the unused MedicineDetails grid
  * Merge pull request #161 from RyanNerd/159-create-otclistgroupgrid
  * Create a grid specifically for OtcListGroup
  * Merge pull request #160 from RyanNerd/157-create-manageotcgrid
  * Create a grid specifically for ManageOtcPage
  * Merge pull request #158 from RyanNerd/147-add-search-manage-otc
  * Add Search :mag: Textbox to Manage Otc Tab
  * Merge pull request #156 from RyanNerd/154-refactor-druglog-grid
  * Refactor Drug History
  * Merge pull request #155 from RyanNerd/152-drug-history-rx-tab
  * Add History Radio Button to Rx tab - Factored out the meat of DrugHistoryPage into DrugHistory.tsx - DrugHistoryPage and MedicinePage use DrugHistory for display of drug log history and print - Added "(OTC)"" to the DrugLogGrid indicating an OTC drug log - Memoized DrugHistoryPage in the LandingPage to reduce re-renders
  * Merge pull request #153 from RyanNerd/149-remove-the-drug-log-table-from-manag
  * Remove Drug Log table from ManageDrugPage
  * Reorganization and Toast own component
  * Merge pull request #151 from RyanNerd/fix-checkout-drug-history
  * Show checkouts in drug log history
  * Merge pull request #150 from RyanNerd/performance
  * Performance :runner: enhancements
  * Performance :runner: enhancement
  * 0.8.0
  * Merge pull request #142 from RyanNerd/pillbox-full-feature
  * UX :bar_chart: Improvement
  * UI :lipstick: improvement
  * Toasts UI :lipstick: improved
  * Limit the DrugLogList to the last 5 days
  * Experimental hook for checking idle
  * - Improved the performance of the pillboxMedLog[] -
  * UI :lipstick: Improvements
  * PillboxListGroup takes children as a prop
  * Pillbox Display
  * PillboxListGroup.tsx changes
  * Code clean up
  * Removal of ClientObserver.ts
  * Removal of the PillboxObserver.ts
  * Removal of the PillboxItemObserver.ts
  * Removal of the DrugLogObserver.ts
  * Code clean up - Remove unneeded `e: React.MouseEvent<HTMLElement>` arguments in MedicineDetail.tsx and components that use it. - Moved the todo: add search box to Manage OTC from comment to an issue - Fixed a bug where even if cancel was chosen do delete an OTC drug the drug would get deleted anyway.
  * Print Medicine Checkout
  * - Change import for react-bootstrap to use direct imports for all components - When the OTC search textbox is cleared the `activeOtc` gets set to null. This was causing visual sync up issues. The search text would be set to an empty string but the selected drug would still be active.
  * Many changes
  * Make multiSort() generic
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * UI :lipstick: improvements
  * Refactoring
  * Fix :wrench: some UI :bug: bugs
  * More UI :lipstick: on MedicinePage
  * UI :lipstick: Changes
  * Fixing my brain fart
  * Fix :wrench: deleting a drugLog wasn't refreshing the `drugLogList`
  * removed lastTaken as a useState()/useEffect()
  * Removed `drugLogList` from MedicinePage
  * Merge remote-tracking branch 'origin/pillbox-full-feature' into pillbox-full-feature
  * Attempted a refactor of the async DrugLog
  * UI :lipstick: Change to log buttons
  * UI :lipstick: Change to log buttons
  * Significantly Simplified PillboxListGroup
  * Significantly Simplified PillboxListGroup
  * Refactored some pillbox log history functions
  * Partially fix "update" in the MedicineManager.ts
  * Attempt at getting Log Pillbox functionality
  * Show pillbox items in the med dropdown list
  * = Disable the Pillbox radiobutton if `medicineList` has less than 5 items
  * - OtcListGroup search textbox autoFocus - The MedicineDetail grid row will appear in bold if selected
  * Minor code clean up in MedicinePage.tsx
  * Simplified OtcListGroup
  * Flatten and sort all imports
  * - Fixed a missing useEffect dependency in MedicinePage.tsx - Flattened imports   - See: https://dev.to/nilanth/no-more-import-in-react-2mbo
  * Remove `activeClient` global
  * Manage activeMed state better when adding med
  * Keep state of activeMed when drugs are logged
  * :broom: Clean up code
  * Move all PillboxPage.tsx into PillboxListGroup.tsx - Moved the logic from PillboxPage as a landing page item instead making it a ListGroup item - Fixed a bug in `getPillboxItemS()` where the filter wasn't including the `pillboxId` - Removed the PillboxPage from the LandingPage - Added PillboxCard.tsx as a more feature rich PillboxItemGrid - MedicinePage.tsx updated to use PillboxListGroup new features and PillboxCard - PillboxItemGrid.tsx :building_construction:  scaffolding added for click on row functionality - PillboxListGroup.tsx placeholder replaced with actual logic and features :atom_symbol: - Destroyed :bomb: PillboxPage.tsx - Destroyed :bomb: MedicineListGroup.tsx
  * - Set initial state of `activeMed`, `activeOtc` & `activePillbox` by using `usePrevious()` hook. - Changed `LIST_TYPE` to `DISPLAY_TYPE` and added a Print to the enum. - Removal of the `<Collapse>` component in OtcListGroup.tsx - Conditional rendering fixed and updated in MedListGroup.tsx - LandingPage.tsx documentation updated
  * Moved state back down to components in LandingPage
  * Major :ringed_planet: :construction_worker: Overhaul of MedicinePage - MedicinePage can now be in one of three states:   1. Medicine - select and log prescriptions   2. OTC - Select and log OTC drugs   3. Pillbox - Select a pill box and log drugs therein - Complete UI :lipstick: redesign for MedicinePage.tsx - MedListGroup changed to **only** handle prescriptions (was handling pillbox and drugs -- needed separation of concerns) - Removed Show/Hide OTC buttons in OtcListGroup - Added PillboxListGroup.tsx - Added radio buttons Medicine, OTC, and Pillbox to let user set state. - OtcList global moved to LandingPage.tsx and passed into MedicinePage.tsx
  * - Minor code clean-up in About.tsx - ActiveResidentObserver.ts uses the `usePrevious()` hook now. - ApiKeyObserver.ts uses `asyncWrapper()` for better error control. - Minor code clean-up in ConfirmDialogModal.tsx - Very minor code clean-up in ErrorDetailsObserver.ts (removed a space) - Added function getPillboxItems.ts so MedicinePage.tsx and PillboxPage.tsx can share code. - Added `IPillboxItemObserver` interface to global.d.ts - Some code clean-up for LandingPage.tsx as well as some todos. Also `<PillboxPage>`` takes additional attributes passed in from LandingPage. - Minor code clean-up in MedDropdown.tsx - Added `<PillboxItemGrid>` to be displayed when the selected activeId is a pillbox. - Code clean-up for MedListGroup.tsx  - `<TooltipButton>` replaced with a standard `<Button>`  - Removed `tooltipText()` since it was displaying with the `<ToolTipButton>` anyway  - Added a + Log ALL Drugs in Pillbox button (not currently functional - PillboxItemGrid.tsx uses getPillboxItems.ts to build out the `PillRows. Some code clean-up. - Code clean-up in PillboxItemObserver.ts - PillboxPage.tsx   - Added props refresh for `pillboxItemList`, `pillboxList`, and `activePillbox`   - Use `getPillboxItems()` to fetch `PillboxItemRows` - Added a `usePrevious()` hook.
  * - Continued the overhaul of MedicinePage.tsx to use MedListGroup.tsx and support pillboxes. activeId is used instead of activeDrug. - Moved state from MedDropdown.tsx for the buildout of the listItems to MedListGroup.tsx. This solved a bunch of issues. - Removed the `medicineList` and `pillboxList` from MedDropdown.tsx replacing them with an `itemList` prop that comes from the MedListGroup.tsx solving a bunch of issues.
  * - Added `React.StrictMode` to all things ` <LandingPage>` :small_airplane: - Moving state up to the LandingPage.tsx for global lists. - Starting on the major revamp of MedicinePage.tsx so that it can support Pillboxes - MedListGroup.tsx created to replace MedicineListGroup.tsx - MedDropdown.tsx replaces MedicineDropdown.tsx - Minor :lipstick: cosmetic changes to PillboxEdit.tsx - Minor :lipstick: changes in PillboxPage.tsx
  * - :lipstick: Code Formatting
  * - :lipstick: UI formatting for the `TabPane` in PillboxPage.tsx   - The `Card.Title` now has a formatted pillbox name that looks similar to the selected `Nav` item.   - Added some text to help users know how to determine what is in the selected pillbox - Added Bootstrap color enumerator `BsColor` to common.ts - Both PillboxPage.tsx and PillboxItemGrid.tsx use `BsColor` enum
  * - Quantity selection in PillboxItemGrid.tsx is now a dropdown split button - Scaffolding set up for `onEdit()` handling in PillboxPage.tsx
  * - Significantly changed how PillboxItemGrid.tsx works by:    - sorting on Quantity, Drug    - Removed :boom: delete button    - Added small buttons of + qty    - All medicines for the client are displayed in the grid - PillboxPage.tsx changed to handle the new signature of PillboxItemGrid.tsx - Added _multiSort()_ function in common.ts to handle multiple column sorting.
  * 0.7.2
  * Merge pull request #141 from RyanNerd/manage-rx-row-size
  * UI :lipstick: fix :wrench: for ManageRx tab
  * 0.7.1
  * Fix a regression :bug: in MedicineEdit.tsx
  * Merge pull request #139 from RyanNerd/active-switch
  * 0.7.0
  * Medicine Active checkbox and Other drug names
  * 0.6.1
  * - When coping a the client name to the clipboard use the format FirstName LastName (was Lastname, FirstName) - Spelling fix in DiagnosticPage.tsx
  * Merge pull request #136 from RyanNerd/pillbox
  * 0.6.0
  * Search criteria signature change
  * Search criteria signature change
  * Dependency version & Diagnostics
  * Merge pull request #133 from RyanNerd/client-dropdown-minor-change
  * 0.5.1
  * Client dropdown addition
  * Version bump
  * Merge pull request #132 from RyanNerd/108-force-print-dialog-when-a-new-client
  * When adding new client show print dialog
  * Merge pull request #131 from RyanNerd/129-when-the-system-crashes-the-client-n
  * When ErrorDetails displayed unset ActiveResident
  * Fix a minor spelling error in code comments
  * Merge pull request #130 from RyanNerd/124-change-how-name-button-popover-works
  * Revamp the client name and DOB buttons
  * Merge pull request #128 from RyanNerd/121-notes-and-directions-for-packs-
  * For DrugHistory use a combo of Notes & Directions
  * Chage link text in About.tsx for issues - Closes #125
  * Updated the docblock for `clientFullName()` in common.ts
  * Merge pull request #127 from RyanNerd/nick-name
  * Nickname added to client / resident
  * Merge pull request #120 from RyanNerd/119-validate-client-dob-is-not-in-the-fu
  * Prevent DOB set in future
  * Merge pull request #118 from RyanNerd/112-medicineedit-fill-date-validation-
  * Prevent future Fill Date when editing Medicine
  * Merge pull request #117 from RyanNerd/109-change-isdayvalid-ismonthvalid-and-i
  * isYear, isDay, and isMonth Valid signature change
  * 0.4.5
  * npm run build exports memory limit before running
  * Small update to README.md
  * Merge pull request #116 from RyanNerd/115-clicking-on-client-dob-button-should
  * Launch edit modal for active client when DOB button clicked
  * Merge pull request #114 from RyanNerd/110-figure-out-why-the-medicineedit-moda
  * Fix 🔧 display issue with MedicineEdit.tsx
  * Merge pull request #113 from RyanNerd/tweak-fill-date-validation
  * Medicine Fill Date 📅 validation 👮
  * Merge pull request #111 from RyanNerd/fix-fill-date
  * Add Fill Date validation 👮
  * Merge pull request #107 from RyanNerd/quack-quack-die
  * Remove 🦆 typing from ManageDrugPage.tsx
  * Merge pull request #106 from RyanNerd/druglog-edit-validation
  * - Consolidated `getDrugName()` in common.ts - Code clean-up 🧹
  * Don't show Out or In fields in DrugLogEdit if OTC
  * Removed a todo that was done
  * Merge pull request #101 from RyanNerd/spinner-observer
  * Add spinner to indcate when system is busy
  * Add spinner 🎡 to Medicine Dropdown when disabled
  * Merge pull request #100 from RyanNerd/observer-finally
  * Use `finally()` in observer promises
  * Delay before invoking print dialog for ClientRoster
  * LoginPage 👷 Rework
  * 0.4.4
  * Merge pull request #99 from RyanNerd/login-flair
  * LoginPage 👷 Rework
  * Clean-up 🧹 code and documentation
  * Version Modal Additions
  * 0.4.3
  * Determine the version via npm env
  * 0.4.2
  * Merge pull request #98 from RyanNerd/revamp-otc
  * Revamp 💄 👷 OTC ListGroup
  * 0.4.1
  * Merge pull request #97 from RyanNerd/fix-dupe-client-issue
  * Fix 🔧 the Resident record dupe problem
  * 0.4.0
  * Merge pull request #96 from RyanNerd/client-notes
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * ➕ Add Client Notes Feature
  * 0.3.18
  * Fix 🔧 + OTC and Edit OTC buttons from bleeding through
  * Merge pull request #95 from RyanNerd/version-update
  * Version updates in package.json
  * Add useStickyState hook for possible future use
  * More code changes to TooltipButton
  * Fix missing required attributes in TooltipButton
  * Get rid of the useless @constructor in JSDOC headers
  * Get rid of the useless @constructor JSDOC
  * Merge pull request #94 from RyanNerd/about-page
  * 0.3.17
  * Add About Modal
  * Merge pull request #93 from RyanNerd/client-name
  * 0.3.16
  * Client name and DOB headers are separate buttons
  * Merge pull request #92 from RyanNerd/fix-client-name-update
  * 0.3.15
  * Fix 🔧 ActiveResident global not getting updated when client info updated
  * Merge pull request #91 from RyanNerd/client-printout
  * 0.3.14
  * Add Feature to Print Client Roster
  * 0.3.13
  * Merge pull request #90 from RyanNerd/client-roster
  * Add Feature to Print Client Roster
  * Merge pull request #89 from RyanNerd/fix-drug-log-edit
  * 0.3.12
  * 🔧 Fixed DrugLogEdit
  * Merge pull request #88 from RyanNerd/bulk-med-checkout
  * 🔧 Fixed Print Medicine Checkout in Manage Rx tab
  * Merge pull request #87 from RyanNerd/bulk-med-checkout
  * 0.3.11
  * 💄Log Drug from Manage Rx tab
  * Date.toLocaleString() TS fix
  * Merge pull request #86 from RyanNerd/otc-in-rx-page
  * 0.3.10
  * :lipstick: Rx tab combines OTC and prescription logging
  * Merge pull request #82 from RyanNerd/show-client-print
  * Add client name and DOB to DrugHistoryPage print area
  * 0.3.9
  * Merge pull request #81 from RyanNerd/get-version-from-package.json
  * Use package.json to obtain version
  * Merge pull request #80 from RyanNerd/fix-print-margins
  * Fix print margins
  * Merge pull request #79 from RyanNerd/fix-drug-history-print
  * Allow the printing of the client name in DrugHistoryPage
  * Bumped up RxChart version in package.json
  * Added Out and In columns to MedicinePage drug log grid
  * Merge pull request #78 from RyanNerd/no-print
  * Print MedicineCheckout Enhancements and 🔧 Fixes
  * Merge pull request #77 from RyanNerd/dependancy-version-update
  * Upgrade ⬆ dependency versions
  * Merge pull request #76 from RyanNerd/disable-login-field-empty
  * Disable Login button if password or username are empty 🗑
  * Merge pull request #75 from RyanNerd/base-url-error-message
  * Display error message if .env is missing or BASEURL isn't set
  * Bumped the version in package.json
  * 💊 Medicine Checkout Feature
  * Merge pull request #74 from RyanNerd/medicine-checkout-feature
  * 💥 Remove `<any>` type
  * ♻ Refactor Validation 👮 code into its own 📁
  * 🔧 Fix `drawBarcode()` to verify the canvas element exists before trying to draw the barcode
  * 💊 OtcPage.tsx
  * 💊 MedicinePage
  * 💊 MedicinePage 🐛 fix
  * 🔨 Fix pressing enter in search textbox causes app to reset.
  * 🔧 Fix NPM dependency ➕
  * Revert tsconfig.json
  * tsconfig.json is pitching a 😠 fit
  * Removed the development 🙈 requirement for the DiagnosticPage.tsx
  * Merge pull request #73 from RyanNerd/disable-log-buttons
  * 🎇 Added disable feature to the log buttons
  * ⬆ Upgraded dependencies
  * 0.3.5
  * 0.3.4
  * Merge pull request #72 from RyanNerd/fix-scroll-to-modal
  * Removed scrollTop feature from all tab pages
  * Merge pull request #71 from RyanNerd/prevent-client-dupe
  * ResidentManager fixed 🔧 to prevent dupes
  * ♻ setApi() changed to emit a promise - Loading of client records, OTC records now only happens AFTER the apiKey is set for ALL providers. - Discourse on the Observer middleware architecture is exhastively commented in App.tsx
  * Consolidation 🧑‍🤝‍🧑 of the AuthObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the OtcMedicineObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the DrugLogObserver 🔭
  * Consolidation 🧑‍🤝‍🧑 of the MedicineObserver 🔭
  * Merge pull request #70 from RyanNerd/observer-consolidation-client
  * Consolidation 🧑‍🤝‍🧑 of the ClientObserver 🔭
  * Added `logout` as a global 🌎 hook 🎣
  * 💄UI Improvements in MedicinePage
  * "💣" removed `console.log()` from UpdateClientObserver.ts
  * ♻ When a new client is added make that client active
  * 💥 Removal of Search box from MedicinePage
  * Merge pull request #69 from RyanNerd/code-reformatting
  * - 💄Code formatting for multiple modules
  * - 💄JSDoc  and code formatting changes
  * ♻ Refactor all `useEffect` in App to Observers 🔭
  * Merge pull request #67 from RyanNerd/otcpage-using-table
  * 💄 UI for OtcPage changed to list 📜 OTC drugs in a table
  * Fix 🔧 a minor linting problem
  * Add Search 🔍 Validation
  * ♻ Refactored <LogButtons> into its own component
  * Added Log button stack to the ListGroup
  * 🚘 In progress - OtcPage using table instead of MedicineListGroup
  * 💄 Changed Tab order in LandingPage.tsx
  * Merge pull request #66 from RyanNerd/hooks-4-updates
  * OtcPage now uses declarative hooks 🎣 for updates and delete processing
  * 💄A little bit of code clean-up 🧹
  * A couple of hooks 🎣 added for OTC
  * 💄Code formatting and adding better comment 💬 headers
  * ♻ Refactoring
  * `login` is now a global 🌎 hook 🎣 that is set to the `{username, password}` when a user logs in.
  * `refreshOtc` is now a hook 🎣 trigger 🔫 for when the otcList needs to be refreshed.
  * - `deleteMedicine` is now a hook 🎣 trigger 🔫 for when a MedicineRecord is to be deleted. - 💄Reorganized the code in App.tsx
  * - `deleteDrugLog` is now a hook 🎣 trigger 🔫 for when a DrugLogRecord is to be deleted. - Fixed a 🐛 in the DiagnosticPage where `CloseErrorButton` wasn't inside the `useMemo()` - Changed MedicineManger, MedicinePage, and OtcPage with how it handles deletes in prep for the next salvo of changes.
  * 🎣 App.tsx is the single source of truth via hooks
  * Merge remote-tracking branch 'origin/hooks-4-updates' into hooks-4-updates
  * 🎣 App.tsx is the single source of truth via hooks 🔧 Fixed a problem when the medicine dropdown changes the selection would revert back to the original value.
  * 💄Code format changes
  * Add ShadowBox 🔲 to Directions in MedicineListGroup - Just for flare's 🌈 sake
  * Merge pull request #65 from RyanNerd/toggle-switch
  * Merge pull request #64 from RyanNerd/shadow-box
  * Add ShadowBox 🔲
  * Add ToggleSwitch 💡
  * 🔧 Fixed the double underline for the medicine link ⛓
  * 💄Add link ⛓ on MedicinePage for drugs 💊 - Added some flair 🌈 to the link via CSS - Link uses [GoodRx](https://goodrx.com)
  * Merge pull request #63 from RyanNerd/react-upgrade-workaround
  * 🔧 Work-around a 🐛 with ⚛ React 17 and DropdownButton - See: https://github.com/react-bootstrap/react-bootstrap/issues/5409 - The work around is here: https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584 - package.json was changed to bring in React ⚛ v17.0.1
  * Add support for Willow 🌳 API error handling - ♻ Refactored DiagnosticPage by adding <CloseErrorButton> reusable component - 🌳 Willow API error parsing added to DiagnosticPage.tsx
  * ♻ Refactoring to import using reactn when possible
  * Merge pull request #62 from RyanNerd/error-state-logout
  * Disable Login page when there is an error
  * 🥅 DiagnosticPage now resets correctly when dismissed - Changed order of operations with LoginPage when testing errors. - Changed LandingPage handling `dismissErrorAlert()` to set global state back to initial values.
  * 🎨 Change activeTabKey state to be string only
  * 💄Added Log 3 & log 4 buttons - Buttons added to MedicineListGroup, MedicinePage, and OtcPage - Added scroll to top for all pages when that page becomes active (except for the LandingPage as that page is always active whem the app starts)
  * Add 📜 Scroll-to-top logic in the ResidentPage when it becomes active
  * 💄When a resident is selected reset the search textbox to an empty string. After a resident is selected when the user returns to the ResidentPage tab typically they are looking to select a different resident or add one and reseting the search textbox to empty string shows the entire resident list.
  * 💄More code formatting in ResidentPage
  * 💄Code formatting 🔨 fix in ResidentPage
  * Merge pull request #61 from RyanNerd/resident-search
  * Add a search 🔍 filter to ResidentPage
  * 🐟 Upstream merge from master
  * 💄Make the Medicine tab title Rx
  * Add search 🔎 to ResidentPage
  * 💄Make all modals backdrop = ⚡static⚡ Modals can no longer be dismissed by clicking off the modal.
  * Added missing `ResidentId` to DrugLogRecord
  * 💄 ResidentGrid now shows Created and Activated columns as formatted dates
  * 📜 Scroll to the top of the page when MedicinePage is active
  * 🔥Removal of no-namespace rule in tslint.json The previous merge allows this rule to be reestablished as the default
  * Merge pull request #60 from RyanNerd/bwip-js-update
  * 🔥Removal of bwip-js.d.js the 👽📦 updated
  * :rotating_light: Added `tslint-react-hooks` to the linter
  * ♻ Refactored ✈LandingPage and  ⚕DrugHistoryPage ⚕DrugHistoryPage now uses globals instead of props Single responsiblity.
  * ✈ LandingPage uses CSS to bold active tabs This used to be done via a function.
  * 💄Cosmetic changes to LandingPage
  * Merge pull request #59 from RyanNerd/active-tab-key
  * ⚡ Improve performance by only rendering tab content when that tab is active Added the prop `activeTabKey` to a number of Pages and put conditional logic in place to prevent render when that tab isn't the active tab.
  * Minor code format 🔨 fix
  * ♻ Refactor MedicinePage, OtcPage, and DrugLogGrid - Make `getObjectByProperty()` generic - Move `getDrugName()` to common.ts for refactoring.
  * 💡Updated DocBlocks to be more concise Also removed 🔥 unneeded `: void` return types
  * Minor change when adding new resident auto switch to Rx tab
  * Changed `calculateLastTaken` to use Created date instead of Updated.
  * Merge pull request #58 from RyanNerd/api-set-change
  * 🔧 Fixed a problem with the DropDown button The dropdown button would stop working after a modal was opened. After a 🌦 day of pulling my 🦱 out trying to figure out what had happened. Finally found this: https://github.com/react-bootstrap/react-bootstrap/issues/5409 Had to thunk React back down to 16.14.0
  * Changed how APIs get set in the providers
  * Merge pull request #57 from RyanNerd/external-package-upgrades
  * Updated several 📦 packages to the latest version bootstrap.min.css was removed 🔥 from the public folder and the stylesheet link in index.html was also removed index.tsx now imports bootstrap.min.css using the NPM package The following 📦 packages were upgraded: - React ⚛ - bootstrap 💄 - bwup-js - typescript 📜 One package was removed: - react-new-window
  * Merge pull request #56 from RyanNerd/frak-upgrade
  * Update Frak to latest version and 🔧 fix Providers - 👽 Frak package is no longer an object but is now a function. All providers changed accordingly. - Error 🐛 handling was updated in DiagnosticPage since Frak no longer emits a custom error, but ⚾ throws the Response as an error when there is an exception.
  * Merge pull request #55 from RyanNerd/gotta-catch-em-all
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Added HTML error handler for Slim/Willow fetch 🐛 errors - HTML erros are now contained in the <Card> ♦ component. - Reviewed all `then().catch()` promises to make sure they ⚾ throw errors - Additional code 💄 clean up
  * Automatically activate ⚡ the Rx (medicine) when a resident is selected
  * Added a dismiss 🔥 option for `_alert()` allowing users to log back in. Also 🚛 moved `_alert()` into `useMemo()`
  * Add 📃 JSDoc blocks to DiagnosticPage.tsx Also added some additional 🦆 type checking logic
  * Merge pull request #54 from RyanNerd/diagnostics-retool
  * Retooling 🔧 of DiagnosticPage.tsx
  * Merge pull request #53 from RyanNerd/global-error-handling
  * :bug: Error handling is now done via a 🌎 global called `errorDetail` All components in the Page directory no loger call `onError()` but instead now use `errorDetails()` Moved the observer that hides the Diagnostic tab to the DiagnosticPage.tsx 💄Improved the code in DiagnosticPage.tsx to better display errors depending on the type of error. The error prop that DiagnosticPage.tsx receives is of the type `any` so some 🦆 typing logic was added. global.d.ts and getInitialState.ts were 🔝 updated to handle the new global `errorDetail` TODO: Make the DiagnosticPage.tsx use an accordion component when showing details. This will be a future task.
  * ✨ Added code in LandingPage to more cleanly set the tab titles and bold the tab that is active.
  * Merge pull request #52 from RyanNerd/auth-manager
  * ♻ Refactor Providers and establish AuthManager 🗑 Removed ProviderTypes.ts moving the type definitions to the individual providers ✨ Created AuthManager to be consistant with design
  * ResidentPage code clean-up 💄 🗑 Removed `refreshDrugs()` since it was only being called from one place and refactored ♻ the code into the orginal caller.
  * 🔧 Fix ResidentPage which had a recursive 🐛 🗑 Removed the `useEffect()` and replaced it with `refreshDrugs()` upon edit/add/select/delete operations
  * ♻ Refactored all the .tsx files in the Pages directory to the components directory
  * Merge pull request #51 from RyanNerd/autoload-lists
  * Handle resident changes via useEffect to reload 🔃 residentList, medicineList, and drugLogLists ♻ Refactored ResidentManager eliminating 🗑 the complexity
  * Merge pull request #50 from RyanNerd/medicine-manager
  * ♻ Refactored ManageDrugPage, ManageOtcPage, and OtcPage to use the :sparkles: new MedicineManager.ts
  * ♻ Refactored MedicinePage to use :sparkles: new MedicineManager.ts
  * Merge pull request #49 from RyanNerd/current-resident
  * 💄Cosmetic code changes and made providers more logical ♻ Refactored the Providers to take baseUrl as an argument 🗑 Removed baseUrl from the globals
  * ✨ Major ♻ refactoring for Resident bussiness logic  Moved all business logic to a ResidentManager module.
  * More 🚲 Bikeshedding cosmetic 💄 code changes to multiple modules
  * 🚲 Bikeshedding some 💄 cosmetic code changes to MedicineListGroup
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to ResidentGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to MedicineDetail
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to DrugLogGrid
  * :bike: Bikeshedding some :lipstick: cosmetic code changes to TooltipButton
  * :sparkler: Added AuthenticationProvider
  * :rocket: Major revision to providers making them type safe :closed_lock_with_key:
  * 💄 cosmetic code changes defaulting to empty arrays for lists instead of null
  * :scroll: Typing and :lipstick: cosmetic code changes to DrugLogGrid and DrugHistoryPage
  * :lipstick: Cosmetic code changes including an .editorconfig file to enforce style
  * More :lipstick: Cosmetic changes to the code (indentation and other)
  * :lipstick: Cosmetic changes to the code (indentation and others)
  * :sunglasses: Simplfy the providers even more
  * Further reduce the warning noise :loud_sound: in the console log by :wrench: fixing the show prop to be bool
  * Eliminate the warning noise :loud_sound: in the console log by changing onAnswer to onSelect
  * :sunglasses: Simplify all providers to use Frak directly
  * Merge pull request #48 from RyanNerd/frak-npm
  * Use Frak from the NPM :package:
  * :arrow_heading_up: Update React to 16.14.0 and add lint rules for code line length and :wrench: fix modules that violated the new rule.
  * Added tslinter :heavy_check_mark: and updated all code
  * :wrench: Fix code indentation in ResidentGrid
  * :wrench: Fix code indentation in MedicineDetail
  * :sunglasses: Simplify DrugLogGrid
  * :tractor: Moved  into  and some :scroll: typing changes
  * :scroll: Type code changes in common
  * :sunny: Clean up code for the  function
  * tractor: Moved  to common
  * useForceUpdate deleted :wastebasket: as it was not being used. :scroll: Types extended for TooltipButton
  * :wrench: Fix :scroll: typings in MedicineListGroup for logDrug callback
  * :wrench: Fix :scroll: typings in MedicineListGroup for barcode canvas
  * :wrench: Fix :scroll: typings in MedicineListGroup and OtcPage
  * :wrench: Fix the typings in DrugDropdown and MedicineListGroup
  * :lipstick: Make IProps interface definiton more specific in ResidentGrid
  * :lipstick: Center text for Selected column in ResidentGrid
  * :lipstick: Add Reload button in ResidentPage and :wrench: tighten up code
  * :wrench: Fix ResidentPage to use TooltipButton
  * :lipstick: Remove condenced class from the Resident table
  * Code format :lipstick: changes in Frak
  * :sunglasses: Simplify LastTakenButton
  * :lipstick Don't display the LastTakenButton if the lastTaken value is null
  * :wrench: Fix the display :lipstick: of Last Taken (hours)
  * :wrench: Fixed :lipstick: formatting in DrugLogGrid for Drug and Created rows
  * :sunglasses: Simplify bolding in ResidentGrid and DrugLogGrid
  * :lipstick: Made selected resident row bold. :wrench: fixed the drug log grid to show in bold when drug logged today
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :wrench: Fixed the warning about MedicineDetail not having unique keys
  * :star2: Add missing Doc-Blocks and :wrench: fix a bug in ResidentPage where medicine logs weren't loading
  * :lipstick: Cosmetic changes to Fill Date display
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in OtcPage
  * :wrench: Fixed an immutability :bug: in MedicinePage
  * :wrench: Fixed error handling in MedHistoryProvider
  * :wrench: Fixed error handling in MedicineProvider
  * :wrench: Fixed error handling in ResidentProvider
  * :wrench: Error handling and added DiagnosticPage to display errors
  * :twisted_rightwards_arrows: Refactor ResidentPage and fix a :bug: in ResidentProvider
  * :wrench: Tightened up code in ResidentPage
  * :lipstick: Make mouse cursor default when the Log 1 / Log 2 buttons are disabled
  * :eight_spoked_asterisk: More changes to the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :eight_spoked_asterisk: Change the layout for MedicinePage and OtcPage to accomidate larger drug names
  * :arrow_heading_up: Upgraded bootstrap.min.css to latest version 4.4.1
  * :rainbow: Changed the color scheme of the DrugLogGrid based on lastTaken
  * :sunglasses: Simplify the LastTakeButton (remove unused props)
  * :cyclone: Major code clean-up
  * :twisted_rightwards_arrows: Refactor DrugLogGrid to use getObjectByProperty()
  * :lipstick: Show drug name in Delete confirmation dialog for OtcPage and MedicinePage
  * :twisted_rightwards_arrows: Refactor deleteDrugLog
  * :sunglasses: Make MedicineDetail a component with props
  * :sunglasses: Make DrugLogGrid more generic
  * :fire: Remove RxTable and use the Table component instead for simplicity :sunglasses:
  * :sunglasses: Make the MedicineDetail more generic
  * :lipstick: Costmetic change make last taken variant color consistant
  * :twisted_rightwards_arrows: More ResidentPage simplification
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :twisted_rightwards_arrows: Refactor and simplify ResidentPage
  * :lipstick: Cosmetic change for Delete confirm in ManageOtcPage
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * :twisted_rightwards_arrows: Refactor uses of ConfirmationDialog into Confirm
  * Fix a :bug: in Confirm and have ManageDrugPage use the new component
  * Create Confirm in the Modals directory as a better more generic ConfirmationDialog
  * Make the ConfirmationDialog more generic :older_man:
  * Add a more prominant warning :warning: when an OTC drug will be deleted
  * Merge pull request #47 from RyanNerd/react-bootstrap-typescript
  * Cosmetic :lipstick: changes to all the tab titles making them bold when active
  * Minor cosmetic :lipstick: code changes
  * :twisted_rightwards_arrows: For consistancy refactor getResidentList
  * :twisted_rightwards_arrows: Refactor remaining refreshList into getLists
  * :twisted_rightwards_arrows: Refactor RefreshMedicineList into getMedicineList
  * Added a :warning: when OTC meds are edited that the change will be for all
  * :twisted_rightwards_arrows: Refactor of ManageOtc, ManageRx, OtcPage, and MedicinePage
  * :beginner: Simplify addEditDrugLog in Medicine and Otc Pages
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage for logging drugs
  * Refactoring of page to Pages
  * :bowtie: Add Log 2 button to MedicineListGroup & fixed a :bug: in OtcPage
  * :bowtie: change layout of OtcPage to better accomidate the drug history grid
  * fix a :bug: with the error handler. Also hide the Diagnostics tab completely when not active
  * :part_alternation_mark: Change how field setFocus works
  * :scroll: TypeScript conversion even more typings and fix an OTC delete bug
  * :scroll: TypeScript conversion even more typings
  * :scroll: TypeScript conversion ResidentProvider typings
  * :scroll: TypeScript conversion ResidentPage fix :bug: DrugLog refresh
  * :scroll: TypeScript conversion ResidentPage typings
  * :scroll: TypeScript conversion More MedicineProvider typings
  * :scroll: TypeScript conversion MedicineProvider typings
  * :scroll: TypeScript clean-up of Frak and elimination of FrakTypes
  * :scroll: Major TypeScript / object conversion for Frak
  * :scroll: TypeScript / object conversion for Frak
  * :scroll: TypeScript conversion Frak
  * :scroll: TypeScript conversion add useProviders() hook
  * :scroll: TypeScript conversion tighten up more code
  * :scroll: TypeScript conversion tighten up code
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for LandingPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for ResidentPage
  * :scroll: TypeScript conversion for MedicinePage
  * :scroll: TypeScript conversion for ManageOtcPage
  * :scroll: TypeScript conversion for ManageDrugPage
  * :scroll: TypeScript conversion for LoginPage
  * :scroll: TypeScript conversion for RefreshMedicineLog
  * :twisted_rightwards_arrows: Refactor of Provider helpers
  * :scroll: TypeScript conversion for RefreshOtcList
  * :scroll: TypeScript conversion for DeleteMedicine
  * :scroll: TypeScript conversion for RefreshMedicineList
  * :scroll: TypeScript conversion for ResidentProvider
  * :scroll: TypeScript conversion for MedicineProvider
  * :scroll: TypeScript conversion for DrugHistoryPage
  * :scroll: TypeScript conversion for ResidentEdit
  * :scroll: TypeScript conversion for MedicineEdit
  * :scroll: TypeScript conversion :bug: fix for DrugLogEdit
  * :scroll: TypeScript conversion for DrugLogEdit
  * :scroll: TypeScript conversion Fix :wrench: up for ConfirmationDialog
  * :scroll: TypeScript conversion Remove InformationDialog
  * :scroll: TypeScript conversion ConfirmationDialog
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion MedicineListGroup
  * :scroll: TypeScript conversion DrugDropdown
  * :scroll: TypeScript conversion MedicineDetail
  * :scroll: TypeScript conversion DrugLogGrid
  * :scroll: TypeScript conversion ResidentGrid
  * :scroll: TypeScript conversion RxTable
  * :scroll: TypeScript conversion LastTakenButton
  * :scroll: TypeScript conversion for React Bootstrap
  * :curly_loop: Yet even more TypeScript conversions
  * :curly_loop: Even more TypeScript conversions
  * :curly_loop: More TypeScript conversions
  * :curly_loop: Minor TypeScript conversions
  * Merge pull request #46 from RyanNerd/medicine-otc-page-refactor
  * :twisted_rightwards_arrows: Refactor of MedicinePage and OtcPage
  * Merge pull request #45 from RyanNerd/otc-feature
  * :lipstick: Even more cosmetic changes & fix to attribute={true} making React mad
  * :lipstick: More cosmetic changes and a subclass of Table
  * :twisted_rightwards_arrows: Refactored LastTakenButton and some cosmetic changes
  * :fountain: Add Log 1 and Log 2 amounts button feature
  * :lipstick: Cosmetic changes
  * :wrench: fixed a minor type :bug: in MedicinePage and OtcPage
  * :zap: Fixed barcode issues and a :bug: in TooltipButton
  * :sunglasses: Fixed the problem with barcodes not showing up correctly
  * :twisted_rightwards_arrows: Convert index.js to index.tsx
  * :star: Change wording in ResidentPage when deleting to 'deactivate'
  * :white_circle: Clean up code in InitialState.tsx
  * Add and fix docblocks
  * :carousel_horse: Work-around for React null handling stupidity
  * :wrench: fixed code in common.js and converted it to common.tsx
  * Tighten up code in MedicineListGroup
  * bwip-js version bump and minor fix to MedicineListGroup
  * Code formatting fixes
  * Tighten up obserer effects in the modals
  * Disable the Save button if the Drug name is empty in the MedicineEdit modal
  * Disable the Save button if Notes are empty in the DrugLogEdit modal
  * Set focus to first name field in the ResidentEdit modal when it is shown
  * Add support for barcodes in search input box
  * Fix OTC Search is valid icon indicator
  * Fix layout problems when there were no medications
  * Tighten some code in MedicinePage
  * Search validation icon logic clean-up
  * Tighten the search useEffect code
  * Handle search matches via useEffect
  * Add docblock to handleMedicineEditModalClose() helper function
  * Refactoring of ManageOtc and ManageDrug pages
  * If enter is pressed on the password textbox then login
  * Add search feature
  * Made sure all MouseEvents had an e.preventDefault()
  * Add PropTypes to remaining components
  * Added PropTypes checking to all pages
  * Convert all functions to arrow functions
  * Fixed an annoying bug where when adding a new resident the medlist wasn't getting cleared
  * Cosmetic fixes and textbox focus feature added
  * Add Manage OTC Page
  * Tightened up some code in MedicinePage and OtcPage
  * A bit of refactoring
  * created a generic TooltipButton replacing the specific AddMedicine button. Also fixed a bug in DrugLogGrid header
  * Removed leftover barcode handling from OtcPage/MedicinePage
  * OtcPage now displays all OTC meds taken in the history
  * Remove setGlobal and use hooks directly instead
  * Convert functions to const
  * Fix problem with OTC meds not showing drug name in DrugHistoryPage
  * Fixed and optimized drugLogList refresh
  * Tweaking things to support OTC -- almost there
  * Removed query and replaced it with search
  * Tightening up code
  * Move Frak() out of the global space
  * remove corrupted InitalState.tsx.sav
  * Save progress
  * Support for OTC
  * Shrink MedicineListGroup in prep for OTC feature.
  * Add DOB to active resident
  * npm package audit fix
  * Fix error when a barcode has no value
  * Merge pull request #43 from RyanNerd/fix-restore-resident
  * Fix medicine log/list not appearing when a resident is restored
  * Merge pull request #42 from RyanNerd/fix-drug-history
  * :bug: Fix drug name not updating on history when edited
  * Merge pull request #41 from RyanNerd/bootstrap-local
  * :sparkles: Make bootstrap.min.css local instead of using a CDN
  * Merge pull request #40 from RyanNerd/organization
  * :sparkles: Organization name now shows when logged in
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * :snowflake: Added code to prevent linter from complaining MedicineListGroup `canvas` is 'unused'
  * Merge pull request #39 from RyanNerd/embed-barcode-renderer
  * :lock: No longer use the barcode API
  * :lock: Make barcode API call use HTTPS
  * Merge pull request #37 from RyanNerd/typescript-continued-1
  * :art: Merged fix from master that fixes TS errors
  * :art: Fixed the problem with App.tsx throwing TS errors
  * Merge pull request #36 from RyanNerd/resident-color-prod-dev
  * :children_crossing: Resident color changes depending on prod/dev
  * :pencil2: Minor fix to index.js
  * Merge pull request #33 from RyanNerd/fix-delete-med-web-issue-8
  * :bug: Fixed issue where the edit medicine modal would show when deleting a medicine
  * Merge pull request #32 from RyanNerd/fix-refresh-med-list
  * :bug: Remove unneeded and buggy code from RefreshMedicineList
  * :bug: Fix RefreshMedicineList
  * Continued TypeScript conversion
  * Merge pull request #31 from RyanNerd/typescript
  * :art: Start on the path of using TypeScript
  * :package: Updated to use the latest create-react-app
  * :package: Add support for TypeScript
  * Merge pull request #30 from RyanNerd/med-alert
  * :sparkles: Alert message for last time med was taken
  * :art: Fix DocBlocks and remove an unneeded CSS file
  * Update README.md
  * Work-around for weird bug in projection for deleting medicine
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for why medicineProvider is showing as undefined.
  * Diagnostic for Deleting a medicine
  * BUGFIX: When adding new resident the medicineList and activeMedicine are cleared
  * RefreshMedicineList now uses search() instead of query() so order_by can be used.
  * Refresh of drug history/log for unTrashed residents and a fix for delete dialog only working once.
  * Added logic to restore inactive residents
  * Merge pull request #25 from RyanNerd/remove-delete-medicine-scan-tab
  * Removed the Delete Medicine button on the MedicinePage
  * Merge pull request #22 from RyanNerd/manage-medicine-barcode
  * Remove subdomain from authentication request
  * Merge pull request #16 from RyanNerd/bacode-refresh
  * Refresh barcode image if the barcode changes
  * Merge pull request #15 from RyanNerd/new-resident-become-active
  * If an existing resident is edited/changed or added make that the ActiveResident
  * Clear barcode when barcode not recognized (after an add or if add is cancelled)
  * Resident DOB for Nov(11) not allowing anything more than 28
  * Add blank EOL to ResidentEdit
  * ResidentGrid columns have LastName FirstName now
  * Fix date verification code
  * Merge remote-tracking branch 'origin/master'
  * Fixed bug when deleting medicine would crash
  * Git ignore the lock files so we don't need to deal with them in production.
  * Added some valdation to ResidentEdit
  * Moved TODO items as issues in Github.
  * Split MediciineListGroup as it's own component to simplify MedicinePage
  * Fixed barcode update issue
  * Added FillDate fields to the MedicineEdit
  * Added barcode and fixed error when no residents exist.
  * Allow deleting medicine
  * Fixed adding new medicine from ManageDrug page
  * Prepped ResidentPage for 'Show Deleted'
  * Fixed a bug when medicine was added on the fly when a barcode is not found
  * Rearranged Medicine edit and delete buttons on Medicine page
  * Removed Chrome Requirement
  * Refactored AddNewMedicineButton into its own component
  * ManageDrugs proof of concept
  * DrugLogGrid layout style changes
  * DrugHistoryPage
  * DrugHistory proof of concept completed
  * Fixed a cosmetic issue in DrugLogGrid as well as updated Reactn in `package.json`
  * MedicineLog now contains ALL history for ALL drugs and is filtered in DrugLogGrid
  * Save progress (proof of concept for window popup)
  * More error handling
  * onError handling via catch() in MedicinePage
  * onError handling
  * Changed text color to blue for Dialog box when a barcode not found
  * Dialog box when a barcode not found
  * DocBlocks for MedicinePage
  * Added delete drug log record feature and fixed a problem when cancelling delete drug.
  * Fixed problem with drug log not updating properly when a new drug was added.
  * Added browserInfo function and moved InitialState.js into the utility directory
  * favicon
  * Use .env to indicate API base url and if development
  * Remove useless code from Frak
  * Small update to the README
  * Update README.md with a better description of this project.
  * ProviderBase preliminary code
  * Document Providers
  * Added logic to delete a Resident
  * Removed the forced uppercase
  * Made drugLogList a global
  * When a resident is selected from the resident list and they have medicine the first one in the list will become the activeDrug
  * Logging of Drugs Modal and POST logic added.
  * Logging of Drugs almost complete
  * Delete functionality, ConfirmationDialog, and InformationDialog components
  * Even more Additional MedicinePage layout changes
  * Additional MedicinePage layout changes
  * MedicinePage layout changes
  * Fix security issue with lodash
  * Preliminary work to get MedicineEdit modal up and running.
  * Some clean up in index.js and index.html
  * Save modal update/save changes.
  * Save modal edit changes.
  * Fix security vulnerability in lodash.
  * Merge pull request #1 from RyanNerd/remove-barcode-as-a-bound-global
  * Make barcode value NOT a global
  * Make barcode value NOT a global
  * Some Refactoring and bug fixes
  * ResidentPage use setGlobal instead of useGlobal for setting state only.
  * Add documentation to LoginPage \ MedicinePage
  * Add documentation to LoginPage \ MedicinePage
  * Fix Linting warnings
  * MedicinePage get barcode and dropdown working again.
  * MedicinePage refactoring
  * LoginPage cosmetic changes
  * Conditional logic for display of drug card
  * Moved quite a bit of logic to MedicinePage
  * Proof of concept for MedicinePage
  * Added Delete (layout only) for Resident List
  * Refactored the Resident Table into it's own component ResidentGrid
  * ResidentEdit modal added
  * Additional features added
  * Build out ScanPage a bit more
  * Save Progress
  * Save Progress
  * ResidentList global populated at login without error this time
  * ResidentList global populated at login
  * Save progress
  * Save progress
  * Save progress
  * Save progress
  * remove .babelrc
  * Initial commit from Create React App
