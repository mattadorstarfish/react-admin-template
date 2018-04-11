import React from 'react';
import {ActionColumn} from "./ActionColumn";
import {Pagination} from "./Pagination";

/**
 * Component to display rows of data in a table
 *
 * @param props
 * @returns {DataTable}
 * @constructor
 */
export class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items !== undefined ? props.items : [],
            first: props.items.length > 0 ? props.items[0] : undefined,
            fields: props.fields !== undefined ? props.fields : [],
            pagination: props.pagination !== undefined ? props.pagination : {
                total: 1,
                current: 1,
                perPage: 1,
                link: ''
            },
            filters: [],
            rows: [],
            headers: []
        };
    }

    componentDidMount() {
        this.setData();
        this.setHeaders();
    }

    setData() {
        this.setState(() => ({
            items: this.props.items !== undefined ? this.props.items : [],
            first: this.props.items.length > 0 ? this.props.items[0] : undefined,
        }));
    }

    setHeaders() {
        if (this.state.first) {
            this.setState(() => ({
                headers: Object.keys(this.state.first).map((name) => {
                    if (this.includeField(name)) {
                        return this.getHeaderName(name);
                    }
                })
            }));
        }
    }

    includeField(name) {
        const result = this.getField(name);
        return result !== undefined;
    }

    getField = (name) => {
        return this.state.fields.find((field) => field.name === name);
    };

    getHeaderName = (name) => {
        const field = this.getField(name);
        if(field.label === undefined) {
            const header = name.charAt(0).toUpperCase() + name.slice(1);
            return header.replace(/_/g, " ");
        }

        return field.label;
    };

    setFilters() {

    }

    getValue = (item, name) => {
        const field = this.getField(name);
        if(field.valueFn !== undefined)
        {
            return field.valueFn(item);
        }
        return item[name];
    };

    getRows() {
        const {actions = []} = this.props;
        return this.state.items.map((item, index) => {
            return <tr key={index}>
                {Object.keys(item).map((name) => {
                    return this.includeField(name) && <td key={name}>{this.getValue(item, name)}</td>;
                })}
                <ActionColumn item={item} actions={actions}/>
            </tr>;
        });
    }

    getHeaders() {
        return this.state.headers.map((name, index) => (
            name !== undefined && <th key={index}>{name}</th>
        ));
    }

    getFilters() {

    }

    render() {
        const {title = ''} = this.props;
        const {pagination, items} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <span>{title}</span>
                </div>
                <div className="card-body">
                {
                    items.length > 0 ?
                        <div className="table-responsive">
                            <table className="table-outline table table-hover">
                                <thead className="thead-light">
                                <tr>
                                    {this.getHeaders()}
                                    <th>Actions</th>
                                </tr>
                                <tr>
                                    {this.getFilters()}
                                </tr>
                                </thead>
                                <tbody>
                                {this.getRows()}
                                </tbody>
                            </table>
                            <Pagination {...pagination}/>
                        </div> :
                        <p>No records found.</p>
                }
                </div>
            </div>
        );
    }
}