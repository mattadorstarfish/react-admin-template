import React from 'react';

export class DropDown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value || (props.items.length > 0 ? props.items[0].value : '')
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = prevState;
        state.value = nextProps.value;

        return state;
    }

    componentDidMount() {
        this.props.onChange({
            target:{
                name: this.props.name,
                value: this.state.value
            }
        });
    }

    onChange = (event) => {
        const value = event.target.value;
        this.setState(()=>({
            value
        }));
        this.props.onChange(event);
    };

    render() {
        const {
            name, label, className="form-control", items = []
        } = this.props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <select
                    name={name}
                    className={className}
                    value={this.state.value}
                    onChange={this.onChange}
                >
                    {
                        items.map((item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }
}