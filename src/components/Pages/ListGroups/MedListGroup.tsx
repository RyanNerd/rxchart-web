import ListGroup from "react-bootstrap/ListGroup";
import LogButtons from "../../Buttons/LogButtons";
import React, {useEffect} from 'reactn';
import ShadowBox from "../../Buttons/ShadowBox";
import TooltipButton from "../../Buttons/TooltipButton";
import {MedicineRecord, PillboxItemRecord, PillboxRecord} from "../../../types/RecordTypes";
import {drawBarcode} from "../../../utility/drawBarcode";
import {getLastTakenVariant} from "../../../utility/common";
import MedDropdown from "./MedDropdown";

interface IProps {
    activeId: number
    addDrugLog: (e: React.MouseEvent<HTMLElement>) => void
    canvasId: string
    canvasUpdated?: (c: HTMLCanvasElement) => void
    disabled?: boolean
    drugChanged: (i: number) => void
    lastTaken: number | null
    logDrug: (n: number) => void
    medicineList: MedicineRecord[]
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
}

interface IDropdownItem {
    id: number, // zero indicated a divider
    description: string
}

/**
 * MedListGroup
 * @param {IProps} props
 * @return {JSX.Element}
 */
const MedListGroup = (props: IProps): JSX.Element => {
    const {
        activeId,
        addDrugLog,
        canvasId,
        canvasUpdated,
        disabled = false,
        drugChanged,
        lastTaken,
        logDrug,
        medicineList,
        pillboxList = [],
        pillboxItemList
    } = props;

    const activeDrug = (medicineList.find(m => m.Id === props.activeId));
    const barCode = activeDrug?.Barcode || null;
    const notes = activeDrug?.Notes || null;
    const directions = activeDrug?.Directions || null;
    const drugId = activeDrug?.Id || null;
    const fillDateText = activeDrug?.FillDateMonth ?
        activeDrug.FillDateMonth + '/' + activeDrug.FillDateDay + '/' + activeDrug.FillDateYear : null;
    const fillDateType = (fillDateText) ? new Date(fillDateText) : null;
    const fillDateOptions = {month: '2-digit', day: '2-digit', year: 'numeric'} as Intl.DateTimeFormatOptions;
    const fillDate = (fillDateType) ? fillDateType.toLocaleString('en-US', fillDateOptions) : null;

    // Update the barcode image if the barcode has changed
    useEffect(() => {
        // Only try to create a barcode canvas IF there is actually a barcode value.
        const canvas = barCode ? drawBarcode(barCode, canvasId) : null;
        if (canvasUpdated && canvas) {
            canvasUpdated(canvas);
        }
    }, [barCode, canvasId, canvasUpdated]);

    /**
     * Determine the tooltip text given the number of hours the drug was last taken
     * @param {number | null} lastTaken
     * @returns {string | null}
     */
    const tooltipText = (lastTaken: number | null): string | null => {
        if (lastTaken === null) return null;
        if (lastTaken <= 1) {
            return activeDrug?.Drug + " taken in the last hour";
        }
        if (lastTaken <= 4) {
            return activeDrug?.Drug + " recently taken";
        }
        return null;
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    const shortenedDrugName = () => {
        const lenCutOff = activeDrug?.OTC ? 10 : 35;
        const drug = activeDrug?.Drug || '';
        if (drug.length > lenCutOff) {
            return drug.substr(0, lenCutOff) + '...';
        } else {
            return drug.substr(0, lenCutOff);
        }
    }

    const getDrugsInPillbox = (pillboxId: number) => {
        alert('build drugs. PillboxId: ' + pillboxId);
        const meds = medicineList.filter(m => {
            return m.Active &&
                pillboxItemList.some(p => p.MedicineId === m.Id && p.PillboxId === pillboxId && p.Quantity > 0);
        });
        meds.forEach((m, i) => {
            const pill = pillboxItemList.find(p => p.MedicineId === m.Id);
            if (pill) {
                meds[i].Quantity = pill.Quantity;
            }
        });
        return meds;
    }

    // Build the items list here:
    const getDropdownItems = () => {
        const items = [] as IDropdownItem[];
        pillboxList.forEach(p => {
            items.push({
                id: -(p.Id as number),
                description: p.Name
            });
        });

        items.push({
            id: 0,
            description: ''
        })

        medicineList.forEach(m => {
            const otherNames = m.OtherNames ? ' (' + m.OtherNames + ') ' : '';
            const strength = m.Strength ? m.Strength : '';
            const description = m.Drug + ' ' + strength + otherNames;

            items.push({
                id: m.Id as number,
                description
            })
        });
        return items;
    }


    return (
        <ListGroup>
            <ListGroup.Item active className="justify-content-left">
                <MedDropdown
                    disabled={disabled}
                    itemList={getDropdownItems()}
                    activeId={activeId}
                    onSelect={i => drugChanged(i)}
                />
            </ListGroup.Item>

            {activeDrug && activeId > 0 ?
                (<>
                <ListGroup.Item>
                    <TooltipButton
                        size="sm"
                        disabled={disabled}
                        tooltip={tooltipText(lastTaken)}
                        placement="top"
                        className="mr-2"
                        variant={lastTakenVariant}
                        onClick={(e: React.MouseEvent<HTMLElement>) => addDrugLog(e)}
                    >
                        + Log Drug
                    </TooltipButton>

                    <LogButtons
                        disabled={disabled}
                        lastTaken={lastTaken}
                        lastTakenVariant={lastTakenVariant}
                        onLogAmount={(n) => logDrug(n)}
                        drugName={shortenedDrugName()}
                    />
                </ListGroup.Item>

                {directions && directions.length > 0 &&
                <ListGroup.Item>
                    <ShadowBox>
                        <b>Directions: </b>{activeDrug.Directions}
                    </ShadowBox>
                </ListGroup.Item>
                }

                {notes && notes.length > 0 &&
                <ListGroup.Item>
                    <ShadowBox>
                        <b>Notes: </b>{activeDrug.Notes}
                    </ShadowBox>
                </ListGroup.Item>
                }

                {fillDate &&
                <ListGroup.Item>
                    <ShadowBox>
                        <b>Fill Date: </b>{fillDate}
                    </ShadowBox>
                </ListGroup.Item>
                }

                {barCode &&
                <ListGroup.Item>
                    <canvas id={canvasId}/>
                </ListGroup.Item>
                }
            </>) : (
                <ListGroup.Item>
                    <p>Here we are</p>
                    <ul>
                        {getDrugsInPillbox(-activeId).map(d =>
                            (
                                <li>
                                    {d.Drug} {" "} {d.Quantity}
                                </li>
                            )
                        )}
                    </ul>
                </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}

export default MedListGroup;
