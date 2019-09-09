import PropTypes from 'prop-types';
import { instancesStore, applicationsStore } from "../../stores/Stores"
import React from "react"
import Grid from '@material-ui/core/Grid';
import List from "./List.react"
import _ from "underscore"
import Loader from '../Common/Loader';
import {CardFeatureLabel} from '../Common/Card';
import Empty from '../Common/EmptyContent';

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.onChangeApplications = this.onChangeApplications.bind(this)
    this.onChangeInstances = this.onChangeInstances.bind(this)
    this.onChangeSelectedInstance = this.onChangeSelectedInstance.bind(this)

    this.state = {
      instances: instancesStore.getCachedInstances(props.appID, props.groupID),
      updating: false,
      selectedInstance: ""
    }
  }

  componentDidMount() {
    applicationsStore.addChangeListener(this.onChangeApplications)
    instancesStore.addChangeListener(this.onChangeInstances)
  }

  componentWillUnmount() {
    applicationsStore.removeChangeListener(this.onChangeApplications)
    instancesStore.removeChangeListener(this.onChangeInstances)
  }

  onChangeSelectedInstance(selectedInstance) {
    this.setState({
      selectedInstance: selectedInstance
    })
  }

  onChangeApplications() {
    instancesStore.getInstances(this.props.appID, this.props.groupID, this.state.selectedInstance)

    this.setState({
      updating: true
    })
  }

  onChangeInstances() {
    this.setState({
      updating: false,
      instances: instancesStore.getCachedInstances(this.props.appID, this.props.groupID)
    })
  }

  render() {
    let groupInstances = this.state.instances;
    let miniLoader = this.state.updating ? <Loader noContainer display="inline" size={12} /> : '';

    let entries = ""

    if (_.isNull(groupInstances)) {
      entries = <Loader />
    } else {
      if (_.isEmpty(groupInstances)) {
        entries = <Empty>No instances have registered yet in this group.<br/><br/>Registration will happen automatically the first time the instance requests an update.</Empty>
      } else {
        entries = <List
                instances={groupInstances}
                version_breakdown={this.props.version_breakdown}
                channel={this.props.channel}
                onChangeSelectedInstance={this.onChangeSelectedInstance} />
      }
    }

    return(
      <Grid container>
        <Grid item xs={12}>
          <CardFeatureLabel>Instances list {miniLoader}</CardFeatureLabel>
        </Grid>
        <Grid item xs={12}>
          {entries}
        </Grid>
      </Grid>
    )
  }

}

Container.propTypes = {
  appID: PropTypes.string.isRequired,
  groupID: PropTypes.string.isRequired,
  version_breakdown: PropTypes.array.isRequired,
  channel: PropTypes.object.isRequired
}

export default Container
