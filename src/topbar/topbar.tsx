import * as React from 'react';

import { Dropdown, Item } from './dropdown';
import { NavigationItems } from './navigation-items';

interface Props<T extends Item> {
    mainItems: Array<T>;
    subItems: Array<T>;
    dropdownLabel: string;
    secondSubItems?: Array<T>;
    secondDropdownLabel?: string;
    // Seems to be a bug in TS `(item: T)` does not work.
    selectedItemWhen: <P extends T>(item: P) => boolean;
}

class Topbar<T extends Item> extends React.Component<Props<T>> {
    public render() {
        return (
            <div className="topbar" data-qa="topbar">
                <div className="left">
                    <div className="topbar-logo" />
                    <NavigationItems items={this.props.mainItems} selectedItemWhen={this.props.selectedItemWhen} />
                </div>
                <div className="right">
                    {this.props.secondDropdownLabel && (
                        <Dropdown
                            id="topbar-second-dropdown"
                            selectedItemWhen={this.props.selectedItemWhen}
                            label={this.props.secondDropdownLabel}
                            items={this.getSubItems(this.props.secondSubItems)}
                        />
                    )}
                    <Dropdown
                        id="topbar-misc-dropdown"
                        selectedItemWhen={this.props.selectedItemWhen}
                        label={this.props.dropdownLabel}
                        items={this.getSubItems(this.props.subItems)}
                    />
                </div>
            </div>
        );
    }

    private getSubItems(items?: Array<T>) {
        return items ? items.map((item) => ({ ...item, isHeader: true })) : [];
    }
}

export { Topbar };
