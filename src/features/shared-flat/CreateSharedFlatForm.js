import React, { Component } from "react";
import { createForm } from "rc-form";
import {
  WingBlank,
  WhiteSpace,
  Card,
  InputItem,
  Button,
  ImagePicker,
} from "antd-mobile";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions";

export class CreateSharedFlatForm extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  onImagePickerChange(files) {
    this.props.actions.chooseFile(files);
  }

  handleSubmit() {
    const formData = this.props.form.getFieldsValue();
    this.props.actions.createSharedFlat(formData);
  }

  renderFormAddressSection(getFieldProps) {
    return (
      <div className="address-form-section">
        <span>Address</span>
        <Button
          inline
          size="small"
          disabled
          style={{ float: "right", marginTop: "-10px" }}>
          Locate me <small>(disabled cause work in progress)</small>
        </Button>
        <WhiteSpace size="lg" />
        <InputItem
          {...getFieldProps("street")}
          type="text"
          required
          placeholder="street"
        />
        <InputItem
          {...getFieldProps("postalCode")}
          type="number"
          required
          placeholder="postal code"
        />
        <InputItem
          {...getFieldProps("city")}
          type="text"
          required
          placeholder="city"
        />
        <InputItem
          {...getFieldProps("country")}
          type="text"
          required
          placeholder="country"
        />
      </div>
    );
  }

  renderFormGlobalSection(getFieldProps) {
    return (
      <div className="general-form-section">
        <span>General</span>
        <WhiteSpace size="lg" />
        <InputItem
          {...getFieldProps("name")}
          type="text"
          required
          autoFocus
          placeholder="name"
        />
        <InputItem
          {...getFieldProps("size")}
          type="number"
          required
          placeholder="size"
        />
        <InputItem
          {...getFieldProps("pricePerMonth")}
          placeholder="price per month"
          type="money"
          moneyKeyboardAlign="left"
        />
      </div>
    );
  }

  renderFormCustomizeSection(files) {
    return (
      <div className="customize-form-section">
        <span>Customize</span>
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <small>Icon first, banner last</small>
        </WingBlank>
        <WhiteSpace />
        <ImagePicker
          files={files}
          onChange={(file, type) => this.onImagePickerChange(file, type)}
          selectable={files.length < 2}
        />
      </div>
    );
  }

  renderForm() {
    const { getFieldProps } = this.props.form;
    const { files } = this.props.sharedFlat;
    return (
      <WingBlank>
        {this.renderFormGlobalSection(getFieldProps)}
        {this.renderFormAddressSection(getFieldProps)}
        {this.renderFormCustomizeSection(files)}
      </WingBlank>
    );
  }

  render() {
    return (
      <WingBlank>
        <form>
          <WhiteSpace size="lg" />
          <Card className="create-shared-flat-form">
            <Card.Header title="Home sweet home" />
            <Card.Body>{this.renderForm()}</Card.Body>
          </Card>
          <WhiteSpace size="lg" />
          <Button
            className="btn"
            type="primary"
            onClick={event => this.handleSubmit(event)}>
            Create
          </Button>
          <WhiteSpace size="lg" />
        </form>
      </WingBlank>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    sharedFlat: state.sharedFlat,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

const CreateSharedFlatFormWrapper = createForm()(CreateSharedFlatForm);

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateSharedFlatFormWrapper,
);
