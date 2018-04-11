export class Model {
    constructor({type = '', plural = '', fields = [], links = [], actions = []}) {
        this.type = type;
        this.plural = plural;
        this.fields = fields;
        this.links = links;
        this.actions = actions;
    }

    getLinks() {
        const baseUrl = this.getBaseUrl();
        return this.links.map((link) => ({
            url: `${baseUrl}/${link.url}`,
            name: link.name ? link.name : this.plural,
            icon: link.icon,
            children: link.children !== undefined ? link.children.map((item) => ({
                url: `${baseUrl}${item.url}`,
                name: item.name,
                icon: item.icon
            })) : []
        }));
    }

    getDefaultObject() {
        let object = {};
        this.fields.forEach((field) => {
            if (Model.isEditable(field)) {
                object[field.name] = field.defaultValue ? field.defaultValue : undefined;
            }
        });
        return object;
    }

    getFormFields() {
        return this.fields.reduce((result, field) => {
            if (!Model.exclude(field) && Model.isEditable(field)) {
                field.value = '';
                result.push(field);
            }
            return result;
        }, []);
    }

    getDisplayFields() {
        return this.fields.reduce((result, field) => {
            if (!field.hide) {
                result.push(field);
            }
            return result;
        }, []);
    }

    static isEditable(field) {
        return field.editable === undefined || field.editable !== false;
    }

    static exclude(field) {
        return field.excludeFromForm !== undefined && field.excludeFromForm === true;
    }

    getBaseUrl() {
        const url = this.plural.toLowerCase().replace(/ /g, "-");
        return `/${url}`;
    }

    getActions(props) {
        return this.actions(props);
    }
}