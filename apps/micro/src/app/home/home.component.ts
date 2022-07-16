import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  addWidget(widgets: Widget[], widget: Widget) {
    const newWidget = Object.assign({}, widget, { id: uuidv4() });
    widgets = [...widgets, newWidget];
    return widgets;
  }

  updateWidget(widgets: Widget[], widget: Widget) {
    widgets = widgets.map((_widget) =>
      widget.id === _widget.id ? Object.assign({}, widget) : _widget
    );
    return widgets;
  }

  deleteWidget(widgets: Widget[], widget) {
    widgets = widgets.filter((_widget) => widget.id !== _widget.id);
    return widgets;
  }

  updateWidgets(mode, widgets: Widget[], widget: Widget) {
    switch (mode) {
      case 'create':
        return this.addWidget(widgets, widget);
      case 'update':
        return this.updateWidget(widgets, widget);
      case 'delete':
        return this.deleteWidget(widgets, widget);
      default:
        return widgets;
    }
  }

  getTotalPrice(widgets: Widget[]) {
    return widgets.reduce((acc, curr) => acc + curr.price, 0);
  }

  reCalculateTotal(mode, widgets: Widget[], widget: Widget) {
    widgets = this.updateWidgets(mode, widgets, widget);
    return this.getTotalPrice(widgets);
  }
}
