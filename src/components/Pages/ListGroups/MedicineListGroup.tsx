import DrugDropdown from "./DrugDropdown";
import ListGroup from "react-bootstrap/ListGroup";
import LogButtons from "../../Buttons/LogButtons";
import React, {useEffect} from 'reactn';
import ShadowBox from "../../Buttons/ShadowBox";
import TooltipButton from "../../Buttons/TooltipButton";
import {MedicineRecord} from "../../../types/RecordTypes";
import {drawBarcode} from "../../../utility/drawBarcode";
import {getLastTakenVariant} from "../../../utility/common";

interface IProps {
    activeDrug: MedicineRecord
    addDrugLog: (e: React.MouseEvent<HTMLElement>) => void
    buttonTitle?: string
    canvasId: string
    canvasUpdated?: (c: HTMLCanvasElement) => void
    disabled?: boolean
    drugChanged: (d: MedicineRecord) => void
    lastTaken: number | null
    logDrug: (n: number) => void
    medicineList: MedicineRecord[]
}

/**
 * MedicineListGroup
 * @param {IProps} props
 * @return {JSX.Element}
 */
const MedicineListGroup = (props: IProps): JSX.Element => {
    const {
        activeDrug,
        addDrugLog,
        buttonTitle = 'Log',
        canvasId,
        canvasUpdated,
        disabled = false,
        drugChanged,
        lastTaken,
        logDrug,
        medicineList
    } = props;

    const barCode = activeDrug.Barcode || null;
    const notes = activeDrug.Notes || null;
    const directions = activeDrug.Directions || null;
    const drugId = activeDrug.Id || null;
    const fillDateText = activeDrug.FillDateMonth ?
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
            return activeDrug.Drug + " taken in the last hour";
        }
        if (lastTaken <= 4) {
            return activeDrug.Drug + " recently taken";
        }
        return null;
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    const shortenedDrugName = () => {
        const lenCutOff = activeDrug.OTC ? 10 : 35;
        if (activeDrug.Drug.length > lenCutOff) {
            return activeDrug.Drug.substr(0, lenCutOff) + '...';
        } else {
            return activeDrug.Drug.substr(0, lenCutOff);
        }
    }

    return (
        <ListGroup>
            <ListGroup.Item active className="justify-content-left">
                <DrugDropdown
                    disabled={disabled}
                    medicineList={medicineList}
                    drugId={drugId}
                    onSelect={(drug: MedicineRecord) => drugChanged(drug)}
                />
            </ListGroup.Item>

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
                    buttonTitle={buttonTitle}
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
        </ListGroup>
    );
}

export default MedicineListGroup;
