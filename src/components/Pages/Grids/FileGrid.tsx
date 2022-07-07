import Button from 'react-bootstrap/Button';
import Table, {TableProps} from 'react-bootstrap/Table';
import React from 'reactn';
import {FileRecord} from 'types/RecordTypes';
import {randomString} from 'utility/common';

interface IProps extends TableProps {
    [key: string]: unknown;
    disabled?: boolean;
    onDownload: (fileRecord: FileRecord) => void;
    onDelete: (fileRecord: FileRecord) => void;
    onEdit: (fileRecord: FileRecord) => void;
    fileList: FileRecord[];
}

interface ITableProps extends TableProps {
    disabled?: boolean;
    onDownload: unknown;
    onDelete: unknown;
    fileList: unknown;
    onEdit: unknown;
}

/**
 * FileGrid
 * @param {IProps} props The props for this component
 */
const FileGrid = (props: IProps): JSX.Element | null => {
    const {fileList, onDownload, onDelete, onEdit, disabled = false} = props;

    // No render if there isn't anything to render
    if (!fileList || fileList.length === 0) return null;

    /**
     * Child component for the table for each DocumentRecord object.
     * @param {FileRecord} file The Document row object
     */
    const FileRow = (file: FileRecord): JSX.Element | null => {
        const domId = file.Id ? file.Id : randomString();

        return (
            <tr key={`file-grid-row-${domId}`} id={`file-grid-row-${domId}`}>
                <td style={{verticalAlign: 'middle'}}>{file.FileName}</td>
                <td style={{verticalAlign: 'middle'}}>{file.Description}</td>
                <td style={{verticalAlign: 'middle'}}>{file.MediaType}</td>
                <td style={{verticalAlign: 'middle'}}>{file.Size}</td>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        disabled={disabled}
                        id={`file-grid-edit-btn-${domId}`}
                        onClick={() => onEdit(file)}
                        size="sm"
                        variant="info"
                    >
                        Edit
                    </Button>
                </td>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        disabled={disabled}
                        id={`file-grid-download-btn-${domId}`}
                        onClick={() => onDownload(file)}
                        size="sm"
                        variant="info"
                    >
                        Download
                    </Button>
                </td>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        disabled={disabled}
                        id={`file-grid-delete-btn-${domId}`}
                        onClick={() => onDelete(file)}
                        size="sm"
                        variant="outline-danger"
                    >
                        <span role="img" aria-label="delete">
                            🗑️
                        </span>
                    </Button>
                </td>
            </tr>
        );
    };

    const tableProps = {...props} as ITableProps;
    delete tableProps.onDelete;
    delete tableProps.onDownload;
    delete tableProps.onEdit;
    delete tableProps.fileList;

    return (
        <Table style={{wordWrap: 'break-word'}} {...tableProps} bordered hover size="sm" striped>
            <thead>
                <tr>
                    <th>Filename</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{fileList.map((p) => FileRow(p))}</tbody>
        </Table>
    );
};

export default FileGrid;
