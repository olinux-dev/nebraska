import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import semver from 'semver';
import _ from 'underscore';
import { cleanSemverVersion } from '../../constants/helpers';
import Item from './Item.react';

function List(props) {
  let [selectedInstance, setSelectedInstance] = React.useState(null);
  let versions = props.version_breakdown || [];
  let lastVersionChannel = props.channel.package ? cleanSemverVersion(props.channel.package.version) : '';
  let versionNumbers = (_.map(versions, (version) => {
    return cleanSemverVersion(version.version)
  })).sort(semver.rcompare);


  function onItemToggle(id) {
    if (selectedInstance !== id) {
      // Save opened instance
      props.onChangeSelectedInstance(id);
      setSelectedInstance(id);
    } else {
      // Remove opened instance
      props.onChangeSelectedInstance('');
      setSelectedInstance(null);
    }
  }

  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>IP</TableCell>
          <TableCell>Instance ID</TableCell>
          <TableCell>Current Status</TableCell>
          <TableCell>Version</TableCell>
          <TableCell>Last Check</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {props.instances.map((instance, i) =>
        <Item
          key={"instance_" + i}
          instance={instance}
          lastVersionChannel={lastVersionChannel}
          versionNumbers={versionNumbers}
          selected={selectedInstance === instance.id}
          onToggle={onItemToggle}
        />
      )}
      </TableBody>
    </Table>
  );
}

List.propTypes = {
  instances: PropTypes.array.isRequired,
  version_breakdown: PropTypes.array,
  channel: PropTypes.object
}

export default List
