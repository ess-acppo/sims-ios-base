﻿var mapPath; // = "file:///storage/emulated/0/maps/PNG/";
var emptyTilePath; // = "maps/empty.png";
var AppMode; // = 'PH';
var infoWindow;
var zoomlevel = document.getElementById('zoomlevel');
var settings = document.getElementById('AppMode');
var statusElem = document.getElementById('status');
var map;
var myCenter; 
var results;
var resSettings;
var newMarker;
var db = null;  
var markers = [];
var markersc = [];
var table;
var curIdx;
var curLat;
var curLng;
var curAlt;
var curWkt;
var curDiscipline;
var numPlants = 0;
var plantName; var Idx;
var numEntoHosts = 0;
var numEntoTargets = 0;
var hostName;
var numPathHosts = 0;
var numPathTargets = 0;
var esamples = 0;
var psamples = 0;
var addlObservers;
var resizeId;
var firstLoad = 0;
/* AH Initialized variables */
//var species = '<div class="row col-md-12 sims dynarow"><div class="form-group col-xs-2"><input type="text" class="form-control speciesText"/></div><div class="form-group col-xs-2"><label>Taxon Name<span class="bold-red">*</span></label></div><div class="form-group col-xs-2"><input type="text" class="form-control taxonText" placeholder="Taxon Name" name="taxonName"></div><div class="form-group col-xs-3" ><label>Number in Group<span class="bold-red">*</span></label></div><div class="form-group col-xs-1"><input type="text" class="form-control" placeholder="#" name="Number"></div><div class="form-group col-xs-1"><button type="button" class="btn btn-danger btn-circle btn-xs pull-right removeSpecies"><i class="fa fa-times-circle fa-2x"></i></button></div></div>';
//var fieldtest = '<div class="row col-md-12 sims dynarow fieldtest"><div class="form-group col-xs-12"><label class="ftName">Field Test 1</label><i class="fa fa-times-circle fa-2x text-default removeFieldTest pull-right"></i></div><div class="form-group col-xs-6"><label>Fieldtest Name<span class="bold-red">*</span></label><input type="text" class="form-control hide" placeholder="Field Test ID" name="ftId"/><select class="form-control" name="fieldTest"></select></div><div class="form-group col-xs-6"><label>&nbsp;</label><br/><input type="checkbox" name="ftInvalid" class="minimal"><label>Invalid</label></div><div class="row col-xs-12 diseases indentLeft"></div><div class="form-group col-xs-11"><label>Field Test Comment</label><input type="text" class="form-control" name="ftComment"/></div></div>';
//var preFieldtest = '<div class="row col-md-12 sims dynarow fieldtest"><div class="form-group col-xs-12"><label class="ftName">Field Test 1</label><i class="fa fa-times-circle fa-2x text-default removePreFieldTest pull-right"></i></div><div class="form-group col-xs-6"><label>Fieldtest Name<span class="bold-red">*</span></label><input type="text" class="form-control hide" placeholder="Field Test ID" name="ftId"/><select class="form-control" name="pFieldTest"></select></div><div class="form-group col-xs-6"><label>&nbsp;</label><br/><input type="checkbox" name="ftInvalid" class="minimal"><label>Invalid</label></div><div class="row col-xs-12 diseases indentLeft"></div><div class="form-group col-xs-11"><label>Field Test Comment</label><input type="text" class="form-control" name="ftComment"/></div></div>';
///var maggotSample = '<div class="row col-md-12 sims dynarow maggotSample"><div class="form-group col-xs-12"><label class="sampleName">Maggot Sample 1</label><i class="fa fa-times-circle fa-2x text-default removeMaggotSample pull-right"></i></div><div class="form-group col-xs-12"><label>Sample Field Id<span class="bold-red">*</span></label><input type="text" class="form-control nextid" placeholder="Sample Field Id" name="msfieldID" value="1"></div><div class="form-group col-xs-12"><label>Sample Type<span class="bold-red">*</span></label><select class="form-control" name="msType"><option selected>Maggots</option></select></div><div class="form-group col-xs-12"><label>Pathogen/Test Type</label><br /><input type="checkbox" class="form-control minimal" name="swfExcl" value="swfExcl" checked><label>SWF Exclusion</label></div><div class="form-group col-xs-12"><label>Additional Comment</label><textarea class="form-control" rows="3" name="msNotes" placeholder="Notes ..."></textarea></div></div>';
//var sample = '<div class="row col-md-12 sims dynarow sample"><div class="form-group col-xs-12"><label class="sampleName">Sample 1</label><i class="fa fa-times-circle fa-2x text-default removeSample pull-right"></i></div><div class="form-group col-xs-6"><label>Sample Field ID</label><input type="text" class="form-control nextid" readonly placeholder="Sample Field ID" value="1" name="sampleId"></div><div class="form-group col-xs-6"><label>Sample Type</label><select class="form-control" name="sampleType"></select></div><div class="form-group col-xs-12"><label>Pathogen/Test Type</label><div class="row col-md-12 sims testTypes indentLeft"></div></div><div class="form-group col-xs-12 border-bottom"><label>Additional Comments</label><textarea class="form-control" rows="6" name="sAddlComments"></textarea></div></div>';
//var preSample = '<div class="row col-md-12 sims dynarow sample"><div class="form-group col-xs-12"><label class="sampleName">Sample 1</label><i class="fa fa-times-circle fa-2x text-default removePreSample pull-right"></i></div><div class="form-group col-xs-6"><label>Sample Field ID</label><input type="text" class="form-control nextid" readonly placeholder="Sample Field ID" value="" name="sampleId"></div><div class="form-group col-xs-6"><label>Sample Type</label><select class="form-control" name="sampleType"></select></div><div class="form-group col-xs-12"><label>Pathogen/Test Type</label><div class="row col-md-12 sims testTypes indentLeft"></div></div><div class="form-group col-xs-12 border-bottom"><label>Additional Comments</label><textarea class="form-control" rows="6" name="sAddlComments"></textarea></div></div>';
//var samples = 0;
//var fieldTests = 0;
/* AH Initialized variables */
/* PH Initialized variables */
var hostweed = '<div class="row col-md-12 hostweed collapsed"><i class="fa fa-arrow-circle-up fa-3x text-arrows collapse hide" data-action="collapse"></i><i class="fa fa-arrow-circle-down fa-3x expand text-arrows" data-action="expand"></i><div class="row col-md-12 col-sm-12 sims"><div class="form-group  col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success" data-original-title="1">1</span><label><span class="bold-red">*&nbsp;</span>Taxon ID</label><input type="number" class="form-control" placeholder="Taxon ID" name="PlantTaxonId_O_N" min="0" max="99999999" maxlength="8"></div><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Host Name</label><input type="text" class="form-control" placeholder="Host Name" name="PlantTaxonText_M_S" data-section="PlantObsTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-3 col-sm-3"><label><span class="bold-red">*&nbsp;</span></label><input type="radio" class="minimal" name="CountList_M_S" value="Count" data-validate="N" maxlength="1" data-section="PlantObsTab">&nbsp;<label>Count</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="CountList_M_S" value="List" data-validate="N" maxlength="1" data-section="PlantObsTab">&nbsp;<label>List</label></div></div><div class="row col-md-12 col-sm-12 sims countArea hide"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Statistic Type</label><select class="form-control select2" name="PlantStatisticType" data-section="PlantObsTab"></select></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Count/Area</label>&nbsp;<span data-toggle="tooltip" title="0" class="badge bg-grey" data-original-title="0">0</span><br /><button type="button" class="btn btn-md btn-default qtyminus"><i class="fa fa-minus"></i></button><input type="number" class="qty count" name="HostStatCount_M_N" value="0" min="0" max="99999999" maxlength="8" data-section="PlantObsTab"><input type="number" class="qty area" name="HostStatAreaNo_M_N" value="0" min="0" max="99999999" maxlength="8" data-section="PlantObsTab"><button type="button" class="btn btn-md btn-default qtyplus"><i class="fa fa-plus"></i></button></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="CheckFutureSurveyFlag_O_S" class="minimal" maxlength="1" data-section="PlantObsTab">&nbsp;<label>Flag</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="ExternalPhotoExistFlag_O_S" class="minimal" maxlength="1" data-section="PlantObsTab">&nbsp;<label>External Photo</label></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Latitude</label><input type="number" class="form-control hostweedlat" name="Latitude" placeholder="Latitude" data-section="PlantObsTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Longitude</label><input type="number" class="form-control hostweedlng" name="Longitude" placeholder="Longitude" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims hide"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Point WKT</label><input type="text" class="form-control" readonly name="LocationPointWktClob_O_S" data-section="PlantObsTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Datum</label><select class="form-control" name="GpsDatumId_O_S" data-section="PlantObsTab"><option>WGS84</option><option>GDA94</option></select></div><div class="form-group col-md-3 col-sm-3"><button class="btn btn-md btn-default getPlantCoords"><i class="fa fa-map-marker text-info"></i>&nbsp;Get Coordinates</button></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Notes</label><textarea class="form-control" rows="6" name="CommentText_O_S" style="height:60px;" maxlength="400" data-section="PlantObsTab"></textarea></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><img class="pp" src="images/plant.png" name="iPlantObsAttachment1_O_S"><input type="hidden" name="PlantObsAttachment1_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment2_O_S"><input type="hidden" name="PlantObsAttachment2_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment3_O_S"><input type="hidden" name="PlantObsAttachment3_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment4_O_S"><input type="hidden" name="PlantObsAttachment4_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment5_O_S"><input type="hidden" name="PlantObsAttachment5_O_S" value="" data-section="PlantObsAttachmentTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><a href="#" class="text-danger removePlant" data-action="removePlant">Delete</a></div></div></div>';
var botSample = '<div class="row col-md-12 col-sm-12 sample collapsed"><i class="fa fa-arrow-circle-up fa-3x text-arrows collapse hide" data-action="collapse"></i><i class="fa fa-arrow-circle-down fa-3x expand text-arrows" data-action="expand"></i><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Sample Field ID </label><input type="text" class="form-control nextid" placeholder="Sample Field ID" name="SampleFieldLabelText_M_S" data-section="PlantSampleTab"></div><div class="form-group col-md-7"><label>Additional Collectors</label><br /><input type="checkbox" name="AdditionalCollectorTab" data-section="PlantSampleTab" class="minimal"></div></div><div class="row  col-md-12 col-sm-12 sims addlCollectors hide"><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName1_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName2_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName3_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims addlCollectors hide"><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName4_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName5_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName6_O_S" data-section="PlantSampleTab"></select></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Number Collected </label><input type="number" class="form-control" placeholder="Number Collected" name="CollectedSampleCount_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label>Linked Sample #</label><input type="text" class="form-control" placeholder="Linked Sample #" name="LinkedSampleFieldLabelText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preliminary Taxon ID </label><input type="number" class="form-control" placeholder="Preliminary ID" name="PrelimTaxonId_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preliminary Taxon Text </label><input type="text" class="form-control" placeholder="Preliminary ID" name="PrelimTaxonText_M_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Latitude </label><input type="number" class="form-control samplelat" placeholder="Latitude" name="Latitude" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Longitude </label><input type="number" class="form-control samplelng" placeholder="Longitude" name="Longitude" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims hide"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Point WKT</label><input type="text" class="form-control" readonly name="SamplePointWktClob_M_S" data-section="PlantSampleTab"></div><div class="form-group col-md-3 col-sm-3"><label><span class="bold-red">*&nbsp;</span>Datum</label><select class="form-control" name="GpsDatumId_M_S" data-section="PlantSampleTab"><option>WGS84</option><option>GDA94</option></select></div><div class="form-group col-md-3 col-sm-3"><button class="btn btn-md btn-default getSampleCoords"><i class="fa fa-map-marker text-info"></i>&nbsp;Get Coordinates</button></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Time</label><input type="datetime-local" class="form-control" placeholder="Time" name="CollectedDatetime_M_D" maxlength="20" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label>Altitude</label><input type="number" class="form-control samplealt" placeholder="Altitude" name="CollectedAltitudeNo_O_N" min="0" max="9999" maxlength="4" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><label>Additional Comments</label><textarea class="form-control" rows="6" name="CommentText_O_S" style="height:60px;" maxlength="400" data-section="PlantSampleTab"></textarea></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Identified By</label><select class="form-control" name="HostIdentifiedUserId_O_N" data-section="PlantSampleTab"></select></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Habit </label><input type="text" class="form-control" placeholder="Habit" name="HabitText_O_S" maxlength="200" data-section="PlantSampleTab"></div><div class="form-group col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Description </label><input type="text" class="form-control" placeholder="Description" name="DetailedDescriptionText_O_S" maxlength="400" data-section="PlantSampleTab"></div><div class="form-group col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Habitat </label><input type="text" class="form-control" placeholder="Habitat" name="HabitatText_O_S" maxlength="400" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Landform </label><input type="text" class="form-control" placeholder="LandForm" name="LandformText_O_S" maxlength="200" data-section="PlantSampleTab"></div><div class="form-group col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Soil/Geology </label><input type="text" class="form-control" placeholder="Soil/Geology" name="SoilGeologyText_O_S" maxlength="200" data-section="PlantSampleTab"></div><div class="form-group col-md-4 col-sm-4"><label>Abundance</label><input type="text" class="form-control" placeholder="Abundance" name="AbundanceText_O_S" maxlength="200" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-2"><label>Preservation Type</label></div><div class="form-group col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-SP_O_S" class="minimal" data-attr="PlantPreservationTab" data-code="SP" data-desc="Spirit Sample" data-seq="1" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Spirit Sample</label></div><div class="form-group col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-DN_O_S" class="minimal" data-attr="PlantPreservationTab" data-code="DN" data-desc="DNA Sample" data-seq="2" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>DNA Sample</label></div><div class="form-group col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-O_O_S" class="minimal" data-attr="PlantPreservationTab" data-code="O" data-desc="Other" data-seq="3" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Other</label>&nbsp;<input type="text" class="form-control hide" placeholder="Other Text" name="BotPlantPreserverOtherText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><input type="checkbox" name="ExternalPhotoExistFlag_O_S" class="minimal" maxlength="1" data-section="PlantSampleTab">&nbsp;&nbsp;<label>Photo(s) taken using external camera</label></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><img class="pp" src="images/plant.png" id="plantPic1"><input type="text" class="hide" id="iplantPic1" name="SampleAttachment1_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic2"><input type="text" class="hide" id="iplantPic2" name="SampleAttachment2_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic3"><input type="text" class="hide" id="iplantPic3" name="SampleAttachment3_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic4"><input type="text" class="hide" id="iplantPic4" name="SampleAttachment4_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic5"><input type="text" class="hide" id="iplantPic5" name="SampleAttachment5_O_S" value="" data-section="SampleAttachmentTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><a href="#" class="text-danger removeBotSample">Delete</a></div></div></div>';
var entobox = '<div class="row col-md-12 col-sm-12 entobox collapsed"><i class="fa fa-arrow-circle-up fa-3x text-arrows collapse hide" data-action="collapse"></i><i class="fa fa-arrow-circle-down fa-3x expand text-arrows" data-action="expand"></i><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success badge-host" data-original-title="1">1</span><label><span class="bold-red">*&nbsp;</span>Taxon ID</label><input type="number" class="form-control" placeholder="ID" name="PlantTaxonId_M_N" min="0" max="99999999" maxlength="8" data-section="PlantObsTab"></div><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Host Name</label><input type="text" class="form-control" placeholder="Host Name" name="PlantTaxonText_M_S" maxlength="50" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Statistic Type</label><select class="form-control select2" name="PlantStatisticType" data-section="PlantObsTab"></select></div><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Count/Area</label>&nbsp;<span data-toggle="tooltip" title="2" class="badge bg-grey" data-original-title="2">1</span><br /><button type="button" class="btn btn-md btn-default qtyminus"><i class="fa fa-minus"></i></button><input type="number" class="qty count" name="HostStatCount_M_N" min="0" max="99999999" maxlength="8" value="0" data-section="PlantObsTab"><input type="number" class="qty area" name="HostStatAreaNo_M_N" min="0" max="99999999" maxlength="8" value="0" data-section="PlantObsTab"><button type="button" class="btn btn-md btn-default qtyplus"><i class="fa fa-plus"></i></button></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="CheckFutureSurveyFlag_O_S" maxlength="1" class="minimal" data-section="PlantObsTab">&nbsp;<label>Flag</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="ExternalPhotoExistFlag_O_S" maxlength="1" class="minimal" data-section="PlantObsTab">&nbsp;<label>External Photo</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Method of Observation</label><select class="form-control" name="PlantObsMethodCode_M_S" data-section="PlantObsTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Notes</label><textarea class="form-control" rows="6" name="CommentText_O_S" maxlength="400" style="height:60px;" data-section="PlantObsTab"></textarea></div></div><div class="row col-md-12 col-sm-12 sims bg-target entotarget"><i class="fa fa-plus fa-2x text-arrows text-info" data-action="addEntoTarget"></i><div class="form-group col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success badge-target" data-original-title="1">1</span><label>Target Taxon Id</label><input type="number" name="TargetTaxonId_O_N" class="input-sm form-control" placeholder="Target Taxon ID" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-6 col-sm-6"><label>Target Taxon Name</label><input type="text" name="TargetTaxonText_M_S" class="input-sm form-control" placeholder="Target Taxon Text" maxlength="50" data-section="PlantObsTargetTab"></div><div class="form-group col-md-2 col-sm-2"><label>Target Count</label><input type="text" name="TargetCount_O_N" class="input-sm form-control" placeholder="Target Count" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optA" value="A" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Observed</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optP" value="P" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Present</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optS" value="S" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Suspected</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optND" value="N" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Done</label></div><div class="form-group col-md-12 col-sm-12"><label>Comments</label><input type="text" name="CommentText_O_S" class="input-sm form-control" placeholder="Comments" maxlength="400" data-section="PlantObsTargetTab"></div><div class="form-group col-md-12 col-sm-12 border-bottom-dark"><i class="fa fa-trash fa-2x text-danger" data-action="removeEntoTarget"></i></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Life Stage</label><select class="form-control select2" name="PlantLifeStgCode_O_S" style="width: 100%;" data-section="PlantObsTab"></select></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Host Plant Status</label></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-3 col-sm-3"><input type="checkbox" name="PlantStatusFruitingFlag_O_S" class="minimal" value="FR" maxlength="2" data-section="PlantObsTab">&nbsp;<label>Fruiting</label></div><div class="form-group col-md-3 col-sm-3"><input type="checkbox" name="PlantStatusFloweringFlag_O_S" class="minimal" value="FL" maxlength="2" data-section="PlantObsTab">&nbsp;<label>Flowering</label></div><div class="form-group col-md-3 col-sm-3"><input type="checkbox" name="PlantStatusFlushingFlag_O_S" class="minimal" value="FU" maxlength="2" data-section="PlantObsTab">&nbsp;<label>Flushing</label></div><div class="form-group col-md-3 col-sm-3"><input type="checkbox" name="PlantStatusDeadWoodFlag_O_S" class="minimal" value="DE" maxlength="2" data-section="PlantObsTab">&nbsp;<label>Deadwood</label></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Latitude</label><input type="number" class="form-control entolat" name="Latitude" placeholder="Latitude" data-section="PlantObsTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Longitude</label><input type="number" class="form-control entolng" name="Longitude" placeholder="Longitude" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims hide"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Point WKT</label><input type="text" class="form-control" readonly name="LocationPointWktClob_O_S" data-section="PlantObsTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Datum</label><select class="form-control" name="GpsDatumId_O_S" data-section="PlantObsTab"><option>WGS84</option><option>GDA94</option></select></div><div class="form-group col-md-3"><button class="btn btn-md btn-default getEntoHostCoords"><i class="fa fa-map-marker text-info"></i>&nbsp;Get Coordinates</button></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><img class="pp" src="images/plant.png" name="iPlantObsAttachment1_O_S"><input type="hidden" name="PlantObsAttachment1_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment2_O_S"><input type="hidden" name="PlantObsAttachment2_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment3_O_S"><input type="hidden" name="PlantObsAttachment3_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment4_O_S"><input type="hidden" name="PlantObsAttachment4_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment5_O_S"><input type="hidden" name="PlantObsAttachment5_O_S" value="" data-section="PlantObsAttachmentTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><a href="#" class="text-danger removeEntoHost" data-action="removeEntoHost">Delete</a></div></div></div>';
var entotarget = '<div class="row col-md-12 col-sm-12 sims bg-target entotarget"><i class="fa fa-plus fa-2x text-arrows text-info" data-action="addEntoTarget"></i><div class="form-group col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success badge-target" data-original-title="1">1</span><label>Target Taxon Id</label><input type="number" name="TargetTaxonId_O_N" class="input-sm form-control" placeholder="Target Taxon ID" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-6 col-sm-6"><label>Target Taxon Name</label><input type="text" name="TargetTaxonText_M_S" class="input-sm form-control" placeholder="Target Taxon Text" maxlength="50" data-section="PlantObsTargetTab"></div><div class="form-group col-md-2 col-sm-2"><label>Target Count</label><input type="text" name="TargetCount_O_N" class="input-sm form-control" placeholder="Target Count" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optA" value="A" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Observed</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optP" value="P" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Present</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optS" value="S" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Suspected</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optND" value="N" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Done</label></div><div class="form-group col-md-12 col-sm-12"><label>Comments</label><input type="text" name="CommentText_O_S" class="input-sm form-control" placeholder="Comments" maxlength="400" data-section="PlantObsTargetTab"></div><div class="form-group col-md-12 col-sm-12 border-bottom-dark"><i class="fa fa-trash fa-2x text-danger" data-action="removeEntoTarget"></i></div></div>';
var entosample = '<div class="row  col-md-12 col-sm-12 sims dynarow sample collapsed"><i class="fa fa-arrow-circle-up fa-3x text-arrows collapse hide" data-action="collapse"></i><i class="fa fa-arrow-circle-down fa-3x expand text-arrows" data-action="expand"></i><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><label><span class="bold-red">*&nbsp;</span>Sample Field ID </label><input type="text" class="form-control nextid" placeholder="Sample Field ID" name="SampleFieldLabelText_M_S" data-section="PlantSampleTab"></div><div class="form-group  col-md-3 col-sm-3"><label>Additional Collectors</label><br /><input type="checkbox" name="AdditionalCollectorTab" class="minimal" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims addlCollectors hide"><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName1_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName2_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName3_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims addlCollectors hide"><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName4_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName5_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName6_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Number Collected </label><input type="text" class="form-control" placeholder="Number Collected" name="CollectedSampleCount_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group  col-md-6 col-sm-6"><label>Linked Sample #</label><input type="text" class="form-control" placeholder="Linked Sample #" name="LinkedSampleFieldLabelText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preliminary ID </label><input type="number" class="form-control" placeholder="Preliminary ID" name="PrelimTaxonId_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preliminary Taxon Text </label><input type="text" class="form-control" placeholder="Preliminary ID" name="PrelimTaxonText_M_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Latitude </label><input type="number" class="form-control samplelat" placeholder="Latitude" name="Latitude" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Longitude </label><input type="number" class="form-control samplelng" placeholder="Longitude" name="Longitude" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims hide"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Point WKT</label><input type="text" class="form-control" readonly name="SamplePointWktClob_M_S" data-section="PlantSampleTab"></div><div class="form-group col-md-3 col-sm-3"><label><span class="bold-red">*&nbsp;</span>Datum</label><select class="form-control" name="GpsDatumId_M_S" data-section="PlantSampleTab"><option>WGS84</option><option>GDA94</option></select></div><div class="form-group col-md-3 col-sm-3"><button class="btn btn-md btn-default getSampleCoords"><i class="fa fa-map-marker text-info"></i>&nbsp;Get Coordinates</button></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Time</label><input type="datetime-local" class="form-control" placeholder="Time" name="CollectedDatetime_M_D" maxlength="20" data-section="PlantSampleTab"></div><div class="form-group  col-md-4 col-sm-4"><label>Altitude</label><input type="text" class="form-control samplealt" placeholder="Altitude" name="CollectedAltitudeNo_O_N" readonly min="0" max="9999" maxlength="4" data-section="PlantSampleTab"></div><div class="form-group  col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Collection Method</label><select class="form-control" name="EntoCollMethodCode_M_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12"><label>Additional Comments</label><textarea class="form-control" rows="6" name="CommentText_O_S" style="height:30px;" maxlength="400" data-section="PlantSampleTab"></textarea></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group col-md-6"><label><span class="bold-red">*&nbsp;</span>Host/Other </label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group col-md-3 col-sm-3"><input type="radio" name="HostFlag_M_S" class="minimal" value="Y" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Host</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" name="HostFlag_M_S" class="minimal" value="N" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Other</label></div><div class="form-group  col-md-3 col-sm-3"><label>Host/Other Taxon Id</label><input type="number" class="form-control" placeholder="Other Name" name="HostTaxonId_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group  col-md-3 col-sm-3"><label>Host/Other Taxon Text</label><input type="text" class="form-control" placeholder="Other Name" name="HostTaxonText_M_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><label>Identified By</label><select class="form-control" name="HostIdentifiedUserId_O_N" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Plant Part</label></div></div><div class="row  col-md-12 col-sm-12 sims">' +
    '<div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-LE_O_S" class="minimal" value="LE" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Leaves</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-FL_O_S" class="minimal" value="FL" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Flower</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-FR_O_S" class="minimal" value="FR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Fruit</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-SE_O_S" class="minimal" value="SE" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Seeds</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-ST_O_S" class="minimal" value="ST" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Stem</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-SH_O_S" class="minimal" value="SH" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Shoot</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-RO_O_S" class="minimal" value="RO" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Root</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-BR_O_S" class="minimal" value="BR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Branch</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-TR_O_S" class="minimal" value="TR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Trunk</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Preservation Type</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-W7_O_S" class="minimal" value="W7" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Wet (Ethanol 70-80%)</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-W8_O_S" class="minimal" value="W8" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Wet (Ethanol>80%)</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-RE_O_S" class="minimal" value="RE" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Rearing</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-DR_O_S" class="minimal" value="DR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Dry</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-FT_O_S" class="minimal" value="FT" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>FTA Card</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPreservationTab-O_O_S" class="minimal" value="O" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Other</label></div><div class="form-group col-md-3 col-sm-3"><input type="text" class="form-control" placeholder="Other Preservation Type" name="PlantPreservOtherText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><label>%Infested </label><select class="form-control" name="EntoInfestedPctCode_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><label>Damage Level </label><select class="form-control" name="EntoDamageLevelCode_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><label>Pest Level </label><select class="form-control" name="EntoPestLevelCode_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Life Stage</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="EntoLifeStgTab-A_O_S" class="minimal" value="A" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Adult</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="EntoLifeStgTab-E_O_S" class="minimal" value="E" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Egg</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="EntoLifeStgTab-I_O_S" class="minimal" value="I" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Immature</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="EntoLifeStgTab-P_O_S" class="minimal" value="P" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Pupae</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12"><input type="checkbox" name="ExternalPhotoExistFlag_O_S" class="minimal" maxlength="1" data-section="PlantSampleTab">&nbsp;&nbsp;<label>Photo(s) taken using external camera</label></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><img class="pp" src="images/plant.png" id="plantPic1"><input type="text" class="hide" id="iplantPic1" name="SampleAttachment1_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic2"><input type="text" class="hide" id="iplantPic2" name="SampleAttachment2_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic3"><input type="text" class="hide" id="iplantPic3" name="SampleAttachment3_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic4"><input type="text" class="hide" id="iplantPic4" name="SampleAttachment4_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic5"><input type="text" class="hide" id="iplantPic5" name="SampleAttachment5_O_S" value="" data-section="SampleAttachmentTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12">&nbsp;<i class="fa fa-trash fa-2x text-danger removeEntoSample"></i></div></div></div>';
var pathbox = '<div class="row  col-md-12 col-sm-12 pathbox collapsed"><i class="fa fa-arrow-circle-up fa-3x text-arrows collapse hide" data-action="collapse"></i><i class="fa fa-arrow-circle-down fa-3x expand text-arrows" data-action="expand"></i><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success badge-host" data-original-title="1">1</span><label><span class="bold-red">*&nbsp;</span>Taxon ID</label><input type="number" class="form-control" placeholder="Taxon ID" name="PlantTaxonId_M_N" min="0" max="99999999" maxlength="8" data-section="PlantObsTab"></div><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Host Name</label><input type="text" class="form-control" placeholder="Taxon Text" name="PlantTaxonText_M_S" maxlength="50" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Statistic Type</label><select class="form-control select2" name="PlantStatisticType" data-section="PlantObsTab"></select></div><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Count/Area</label>&nbsp;<span data-toggle="tooltip" title="2" class="badge bg-grey" data-original-title="2">1</span><br /><button type="button" class="btn btn-md btn-default qtyminus"><i class="fa fa-minus"></i></button><input type="number" class="qty count" name="HostStatCount_M_N" min="0" max="99999999" maxlength="8" value="0" data-section="PlantObsTab"><input type="number" class="qty area" name="HostStatAreaNo_M_N" min="0" max="99999999" maxlength="8" value="0" data-section="PlantObsTab"><button type="button" class="btn btn-md btn-default qtyplus"><i class="fa fa-plus"></i></button></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="CheckFutureSurveyFlag_O_S" maxlength="1" class="minimal" data-section="PlantObsTab">&nbsp;<label>Flag</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="ExternalPhotoExistFlag_O_S" maxlength="1" class="minimal" data-section="PlantObsTab">&nbsp;<label>External Photo</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Method of Observation</label><select class="form-control" name="PlantObsMethodCode_M_S" data-section="PlantObsTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Notes</label><textarea class="form-control" rows="6" name="CommentText_O_S" style="height:60px;" maxlength="400" data-section="PlantObsTab"></textarea></div></div><div class="row  col-md-12 col-sm-12 sims bg-target pathtarget"><i class="fa fa-plus fa-2x text-arrows text-info" data-action="addPathTarget"></i><div class="form-group col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success badge-target" data-original-title="1">1</span><label>Target Taxon ID</label><input type="number" name="TargetTaxonId_O_N" class="input-sm form-control" placeholder="Target Taxon ID" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-6 col-sm-6"><label>Target Taxon Name</label><input type="text" name="TargetTaxonText_M_S" class="input-sm form-control" placeholder="Target Taxon Text" maxlength="50" data-section="PlantObsTargetTab"></div><div class="form-group col-md-2 col-sm-2"><label>Target Count</label><input type="text" name="TargetCount_O_N" class="input-sm form-control" placeholder="Target Count" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optA" value="A" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Observed</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optP" value="P" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Present</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optS" value="S" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Suspected</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optND" value="N" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Done</label></div><div class="form-group col-md-12 col-sm-12"><label>Comments</label><input type="text" name="CommentText_O_S" class="input-sm form-control" placeholder="Comments" maxlength="400" data-section="PlantObsTargetTab"></div><div class="form-group col-md-12 col-sm-12 border-bottom-dark"><i class="fa fa-trash fa-2x text-danger" data-action="removePathTarget"></i></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Life Stage</label><select class="form-control select2" name="PlantLifeStgCode_O_S" style="width: 100%;" data-section="PlantObsTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Latitude</label><input type="number" class="form-control pathlat" name="Latitude" placeholder="Latitude" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Longitude</label><input type="number" class="form-control pathlng" name="Longitude" placeholder="Longitude" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims hide"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Point WKT</label><input type="text" class="form-control" readonly name="LocationPointWktClob_O_S" data-section="PlantObsTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Datum</label><select class="form-control" name="GpsDatumId_O_S" data-section="PlantObsTab"><option>WGS84</option><option>GDA94</option></select></div><div class="form-group  col-md-3 col-sm-3  col-md-3 col-sm-3"><button class="btn btn-md btn-default getPathHostCoords"><i class="fa fa-map-marker text-info"></i>&nbsp;Get Coordinates</button></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><img class="pp" src="images/plant.png" name="iPlantObsAttachment1_O_S"><input type="hidden" name="PlantObsAttachment1_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment2_O_S"><input type="hidden" name="PlantObsAttachment2_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment3_O_S"><input type="hidden" name="PlantObsAttachment3_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment4_O_S"><input type="hidden" name="PlantObsAttachment4_O_S" value="" data-section="PlantObsAttachmentTab"><img class="pp" src="images/plant.png" name="iPlantObsAttachment5_O_S"><input type="hidden" name="PlantObsAttachment5_O_S" value="" data-section="PlantObsAttachmentTab"></div></div><div class="row  col-md-12 col-sm-12  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12  col-md-12 col-sm-12"><a href="#" class="text-danger removePathHost" data-action="removePathHost">Delete</a></div></div></div>';
var pathtarget = '<div class="row col-md-12 col-sm-12 sims bg-target pathtarget"><i class="fa fa-plus fa-2x text-arrows text-info" data-action="addPathTarget"></i><div class="form-group col-md-2 col-sm-2"><span data-toggle="tooltip" title="" class="badge badge-success badge-target" data-original-title="1">1</span><label>Target Taxon ID</label><input type="number" name="TargetTaxonId_O_N" class="input-sm form-control" placeholder="Target Taxon ID" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-6 col-sm-6"><label>Target Taxon Name</label><input type="text" name="TargetTaxonText_M_S" class="input-sm form-control" placeholder="Target Taxon Text" maxlength="50" data-section="PlantObsTargetTab"></div><div class="form-group col-md-2 col-sm-2"><label>Target Count</label><input type="text" name="TargetCount_O_N" class="input-sm form-control" placeholder="Target Count" min="0" max="99999999" maxlength="8" data-section="PlantObsTargetTab"></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optA" value="A" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Observed</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optP" value="P" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Present</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optS" value="S" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Suspected</label></div><div class="form-group col-md-3 col-sm-3"><input type="radio" class="minimal" name="TargetObservedCode_M_S" id="optND" value="N" maxlength="1" data-section="PlantObsTargetTab">&nbsp;<label>Not Done</label></div><div class="form-group col-md-12 col-sm-12"><label>Comments</label><input type="text" name="CommentText_O_S" class="input-sm form-control" placeholder="Comments" maxlength="400" data-section="PlantObsTargetTab"></div><div class="form-group col-md-12 col-sm-12 border-bottom-dark"><i class="fa fa-trash fa-2x text-danger" data-action="removePathTarget"></i></div></div>';
var pathsample = '<div class="row  col-md-12 col-sm-12 sims dynarow sample collapsed"><i class="fa fa-arrow-circle-up fa-3x text-arrows collapse hide" data-action="collapse"></i><i class="fa fa-arrow-circle-down fa-3x expand text-arrows" data-action="expand"></i><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><label><span class="bold-red">*&nbsp;</span>Sample Field ID </label><input type="text" class="form-control nextid" placeholder="Sample Field ID" name="SampleFieldLabelText_M_S" data-section="PlantSampleTab"></div><div class="form-group  col-md-3 col-sm-3"><label>Additional Collectors</label><br /><input type="checkbox" name="AdditionalCollectorTab" class="minimal" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims addlCollectors hide"><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName1_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName2_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName3_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims addlCollectors hide"><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName4_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName5_O_S" data-section="PlantSampleTab"></select></div><div class="form-group  col-md-4 col-sm-4"><select class="form-control" name="AdditionalCollectorName6_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><label><span class="bold-red">*&nbsp;</span>Number Collected </label><input type="number" class="form-control" placeholder="Number Collected" name="CollectedSampleCount_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group  col-md-4 col-sm-4"><label>Linked Sample #</label><input type="text" class="form-control" placeholder="Linked Sample #" name="LinkedSampleFieldLabelText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preliminary ID </label><input type="number" class="form-control" placeholder="Preliminary ID" name="PrelimTaxonId_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preliminary Taxon Text </label><input type="text" class="form-control" placeholder="Preliminary ID" name="PrelimTaxonText_M_S" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Latitude </label><input type="number" class="form-control samplelat" placeholder="Latitude" name="Latitude" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Longitude </label><input type="number" class="form-control samplelng" placeholder="Longitude" name="Longitude" data-section="PlantSampleTab"></div></div><div class="row col-md-12 col-sm-12 sims hide"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Point WKT</label><input type="text" class="form-control" readonly name="SamplePointWktClob_M_S" data-section="PlantSampleTab"></div><div class="form-group col-md-3 col-sm-3"><label><span class="bold-red">*&nbsp;</span>Datum</label><select class="form-control" name="GpsDatumId_M_S" data-section="PlantSampleTab"><option>WGS84</option><option>GDA94</option></select></div><div class="form-group col-md-3 col-sm-3"><button class="btn btn-md btn-default getSampleCoords"><i class="fa fa-map-marker text-info"></i>&nbsp;Get Coordinates</button></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Time</label><input type="datetime-local" class="form-control" placeholder="Time" name="CollectedDatetime_M_D" maxlength="20" data-section="PlantSampleTab"></div><div class="form-group  col-md-6 col-sm-6"><label>Altitude</label><input type="number" class="form-control samplealt" placeholder="Altitude" name="CollectedAltitudeNo_O_N" min="0" max="9999" maxlength="4" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12"><label>Additional Comments</label><textarea class="form-control" rows="6" name="CommentText_O_S" style="height:30px;" maxlength="50" data-section="PlantSampleTab"></textarea></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Host/Other </label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><input type="radio" name="HostFlag_M_S" class="minimal" value="Y" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Host</label></div><div class="form-group col-md-6 col-sm-6"><input type="radio" name="HostFlag_M_S" class="minimal" value="N" maxlength="1" data-section="PlantSampleTab">&nbsp;<label>Other</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group col-md-6 col-sm-6"><label>Host/Other Taxon Id</label><input type="number" class="form-control" placeholder="Other Name" name="HostTaxonId_O_N" min="0" max="99999999" maxlength="8" data-section="PlantSampleTab"></div><div class="form-group col-md-6 col-sm-6"><label>Host/Other Taxon Text</label><input type="text" class="form-control" placeholder="Other Name" name="HostTaxonText_M_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Identified By</label><select class="form-control" name="HostIdentifiedUserId_O_N" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label>Plant Part</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-LE_O_S" class="minimal" value="LE" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Leaves</label></div>' +
    '<div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-FL_O_S" class="minimal" value="FL" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Flower</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-FR_O_S" class="minimal" value="FR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Fruit</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-SE_O_S" class="minimal" value="SE" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Seeds</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-ST_O_S" class="minimal" value="ST" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Stem</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-SH_O_S" class="minimal" value="SH" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Shoot</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-RO_O_S" class="minimal" value="RO" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Root</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-BR_O_S" class="minimal" value="BR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Branch</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-TR_O_S" class="minimal" value="TR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Trunk</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-WP_O_S" class="minimal" value="WP" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Whole Plant</label></div><div class="form-group  col-md-3 col-sm-3"><input type="checkbox" name="PlantPartTab-SO_O_S" class="minimal" value="SO" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Soil</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12"><label>Symptoms</label><input type="text" class="form-control" placeholder="Symptoms" name="PathSymptomsText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Preservation Type </label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-FR_M_S" class="minimal" value="FR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Fresh</label></div><div class="form-group  col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-PR_M_S" class="minimal" value="PR" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Pressed Specimen</label></div><div class="form-group  col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-DE_M_S" class="minimal" value="DE" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Dessicate</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-EX_M_S" class="minimal" value="EX" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Extract</label></div><div class="form-group  col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-IS_M_S" class="minimal" value="IS" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Isolation</label></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-4 col-sm-4"><input type="checkbox" name="PlantPreservationTab-O_M_S" class="minimal" value="O" maxlength="2" data-section="PlantSampleTab">&nbsp;<label>Other</label></div><div class="form-group  col-md-4 col-sm-4"><input type="text" class="form-control" placeholder="Other Preservation Type" name="PlantPreservOtherText_O_S" maxlength="50" data-section="PlantSampleTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Incidence </label><select class="form-control" name="PathIncidCode_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-6 col-sm-6"><label><span class="bold-red">*&nbsp;</span>Severity </label><select class="form-control" name="PathSevCode_O_S" data-section="PlantSampleTab"></select></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12"><input type="checkbox" name="ExternalPhotoExistFlag_O_S" class="minimal" maxlength="1" data-section="PlantSampleTab">&nbsp;&nbsp;<label>Photo(s) taken using external camera</label></div></div><div class="row col-md-12 col-sm-12 sims"><div class="form-group col-md-12 col-sm-12"><img class="pp" src="images/plant.png" id="plantPic1"><input type="text" class="hide" id="iplantPic1" name="SampleAttachment1_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic2"><input type="text" class="hide" id="iplantPic2" name="SampleAttachment2_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic3"><input type="text" class="hide" id="iplantPic3" name="SampleAttachment3_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic4"><input type="text" class="hide" id="iplantPic4" name="SampleAttachment4_O_S" value="" data-section="SampleAttachmentTab"><img class="pp" src="images/plant.png" id="plantPic5"><input type="text" class="hide" id="iplantPic5" name="SampleAttachment5_O_S" value="" data-section="SampleAttachmentTab"></div></div><div class="row  col-md-12 col-sm-12 sims"><div class="form-group  col-md-12 col-sm-12">&nbsp;<i class="fa fa-trash fa-2x text-danger removePathSample"></i></div></div></div>';
/* PH Initialized variables */
var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects
var elementc;
var mapc;
var trackCoords;
var myLatLng;
var paths = [];

setInterval(function () {
    statusElem.className = navigator.onLine ? 'label label-success' : 'label label-info';
    statusElem.innerHTML = navigator.onLine ? 'online' : 'offline';
}, 1000);

function checkPermissions() {
    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE,
        function success(status) {
            if (!status.hasPermission) error();
        }, function error() {
            console.warn('Storage permission not granted!');
        });       
    permissions.requestPermission(permissions.ACCESS_FINE_LOCATION,
        function success(status) {
            if (!status.hasPermission) error();
        }, function error() {
            console.warn('Location permission not granted!');
        });     
    permissions.requestPermission(permissions.CAMERA,
        function success(status) {
            if (!status.hasPermission) error();
        }, function error() {
            console.warn('Location permission not granted!');
        });  
    function error() {
        console.warn('Error granting permission!');
    }
}

function initSettings() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy.toString() + '-' + mm.toString() + '-' + dd.toString();
    db = window.sqlitePlugin.openDatabase({ name: "sims.db", location: 'default' });
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS observations (id integer primary key, filedt text, data blob)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS settings (id integer primary key, settingstext text, settingsval text default '{}')");
    }, function (err) {
        $.growl({ title: "Application Error", message: "An error occurred while initializing the DB. " + err.message, location: "bc", size: "large" });
    });
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM settings WHERE id = ?", [1], function (tx, res) {
            //This is not the first load
            if (res.rows && res.rows.length > 0) {
                resSettings = JSON.parse(res.rows.item(0).settingsval);
                var arr = resSettings.settings.mapSets.filter(function (el) {
                    return (el.activeFlag === 1);
                });
                mapPath = arr[0].mapPath;
                emptyTilePath = arr[0].emptyTilePath;
                myCenter = new google.maps.LatLng(Number(arr[0].mapCenter.lat), Number(arr[0].mapCenter.lng));
                AppMode = resSettings.settings.app.appMode; 
                settings.innerHTML = AppMode;
                var mymap = new MyMapType();
                function MyMapType() { };
                MyMapType.prototype.tileSize = new google.maps.Size(256, 256);
                MyMapType.prototype.maxZoom = arr[0].endZoom;
                MyMapType.prototype.minZoom = arr[0].startZoom;
                MyMapType.prototype.name = "Offline Map";
                MyMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
                    zoomlevel.innerHTML = 'zoom: ' + zoom;
                    curZoom = zoom;
                    var div = ownerDocument.createElement('div');
                    var image = $('<img name="" src="' + mapPath + zoom + "/" + coord.x + "/" + coord.y + '.png"/>');
                    image.error(function () {
                        div.innerHTML = '<img name="" src="' + emptyTilePath + '"/>';
                    });
                    div.innerHTML = '<img name="" src="' + mapPath + zoom + "/" + coord.x + "/" + coord.y + '.png"/>';
                    div.style.width = this.tileSize.width + 'px'; div.style.height = this.tileSize.height + 'px';
                    return div;
                };
                var mapOptions = { zoom: arr[0].startZoom, center: myCenter, streetViewControl: false, panControl: false, zoomControl: false, mapTypeControl: false, scaleControl: false, overviewMapControl: false, mapTypeControlOptions: { mapTypeIds: ["xx"] } };
                map = new google.maps.Map(document.getElementById("map"), mapOptions); map.mapTypes.set('xx', mymap); map.setMapTypeId('xx');
                loadMapMarkers();
                google.maps.event.addListener(map, 'click', function (event) {
                    placeMarker(event.latLng);
                });
                //google.maps.event.addListener(map, 'dblclick', function (event) {
                //    map.setZoom(curZoom + 1);
                //});
                //google.maps.event.addListener(map, 'click', function (event) {
                //    map.setZoom(curZoom - 1);
                //});
            }
            else {
                //This is the first load
                $.ajax({
                    method: "GET",
                    url: "data/settings.json",
                    contentType: "json",
                    success: function (dataS) {
                        resSettings = JSON.parse(dataS);
                        db.transaction(function (tx) {
                            tx.executeSql("DELETE FROM settings", [], function (tx, res) {
                                //alert("Rows deleted.");
                            });
                        }, function (err) {
                            $.growl({ title: "Application Error", message: "An error occured while deleting settings from DB. " + err.message, location: "bc", size: "large", fixed: "true" });
                        });
                        db.transaction(function (tx) {
                            tx.executeSql("INSERT INTO settings (id, settingstext, settingsval) VALUES (?,?,?)", [1, 'appSettings', JSON.stringify(resSettings)], function (tx, res) {
                                //alert("Row inserted.");
                            });
                        }, function (err) {
                            $.growl({ title: "Application Error", message: "An error occured while updating settings to DB. " + err.message, location: "bc", size: "large", fixed: "true" });
                            });
                        db.transaction(function (tx) {
                            tx.executeSql("UPDATE settings SET settingsval = ? WHERE id = ?", [JSON.stringify(resSettings), 1], function (tx, res) {
                                //alert("Dataset updated.");
                                //$.growl({ title: "Changes Saved!", message: "Your changes have been saved!", location: "bc", size: "large", fixed: "true" });
                            });
                        }, function (err) {
                            $.growl({ title: "Application Error", message: "An error occured while updating settings to DB. " + err.message, location: "bc", size: "large", fixed: "true" });
                        });
                        var arr = resSettings.settings.mapSets.filter(function (el) {
                            return (el.activeFlag === 1);
                        });
                        mapPath = arr[0].mapPath;
                        emptyTilePath = arr[0].emptyTilePath;
                        myCenter = new google.maps.LatLng(Number(arr[0].mapCenter.lat), Number(arr[0].mapCenter.lng));
                        AppMode = resSettings.settings.app.appMode;
                        settings.innerHTML = AppMode;
                        var mymap = new MyMapType();
                        function MyMapType() { };
                        MyMapType.prototype.tileSize = new google.maps.Size(256, 256);
                        MyMapType.prototype.maxZoom = arr[0].endZoom;
                        MyMapType.prototype.minZoom = arr[0].startZoom;
                        MyMapType.prototype.name = "Offline Map";
                        MyMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
                            zoomlevel.innerHTML = 'zoom: ' + zoom;
                            curZoom = zoom;
                            var div = ownerDocument.createElement('div');
                            var image = $('<img name="" src="' + mapPath + zoom + "/" + coord.x + "/" + coord.y + '.png"/>');
                            image.error(function () {
                                div.innerHTML = '<img name="" src="' + emptyTilePath + '"/>';
                            });
                            div.innerHTML = '<img name="" src="' + mapPath + zoom + "/" + coord.x + "/" + coord.y + '.png"/>';
                            div.style.width = this.tileSize.width + 'px'; div.style.height = this.tileSize.height + 'px';
                            return div;
                        };
                        var mapOptions = { zoom: arr[0].startZoom, center: myCenter, streetViewControl: false, panControl: false, zoomControl: false, mapTypeControl: false, scaleControl: false, overviewMapControl: false, mapTypeControlOptions: { mapTypeIds: ["xx"] } };
                        map = new google.maps.Map(document.getElementById("map"), mapOptions); map.mapTypes.set('xx', mymap); map.setMapTypeId('xx');
                        $.ajax({
                            method: "GET",
                            url: "data/observations1.json",
                            contentType: "json",
                            success: function (data) {
                                var today = new Date();
                                var dd = today.getDate();
                                var mm = today.getMonth() + 1; //January is 0!
                                var yyyy = today.getFullYear();
                                if (dd < 10) {
                                    dd = '0' + dd
                                }
                                if (mm < 10) {
                                    mm = '0' + mm
                                }
                                today = dd.toString() + '/' + mm.toString() + '/' + yyyy.toString();
                                db.transaction(function (tx) {
                                    tx.executeSql("DELETE FROM observations", [], function (tx, res) {
                                        //alert("Rows deleted.");
                                    });
                                }, function (err) {
                                    $.growl({ title: "Application Error", message: "An error occured while deleting row from DB. " + err.message, location: "bc", size: "large", fixed: "true" });
                                });
                                db.transaction(function (tx) {
                                    tx.executeSql("INSERT INTO observations (id, filedt, data) VALUES (?,?,?)", [1, today, JSON.stringify(data)], function (tx, res) {
                                        //alert("Row inserted.");
                                    });
                                }, function (err) {
                                    $.growl({ title: "Application Error", message: "An error occured while inserting row to DB. " + err.message, location: "bc", size: "large", fixed: "true" });
                                });
                                clearMarkers();
                                results = JSON.parse(data);
                                for (var i = 0; i < results.observations.length; i++) {
                                    var wkt = new Wkt.Wkt();
                                    wkt.read(results.observations[i].ObservationWhereWktClob_M_S);
                                    wkt.toObject();
                                    var latLng = new google.maps.LatLng(wkt.toJson().coordinates[1], wkt.toJson().coordinates[0]);
                                    var ti = results.observations[i].id_M_N.toString().trim() + "/" + results.observations[i].PlantDisciplineCode_M_S.toString().trim();
                                    var marker = new google.maps.Marker({
                                        position: latLng,
                                        map: map,
                                        title: ti
                                    });
                                    markers.push(marker);
                                    google.maps.event.addListener(marker, 'click', function () {
                                        curIdx = this.title.split("/")[0];
                                        var curD = "'" + this.title.split("/")[1].toString().trim() + "'";
                                        curLat = this.getPosition().lat();
                                        curLng = this.getPosition().lng();
                                        //curAlt = this.getPosition().altitude();
                                        if (infoWindow) {
                                            infoWindow.close();
                                        }
                                        infoWindow = new google.maps.InfoWindow({
                                            content: '<div id="content"><h4>Observation ' + this.title + '</h4><div id="bodyContent">' +
                                            '<i class="fa fa-pencil fa-2x text-info" onclick="launchModal(' + curIdx + ',' + curD + ')"></i><label class="text-info">Edit</label></div></div>'
                                        });
                                        infoWindow.setPosition(this.position);
                                        infoWindow.open(map);
                                        map.setCenter(this.position);
                                    });
                                }
                                db.transaction(function (tx) {
                                    tx.executeSql("UPDATE observations SET data = ?,filedt = ? WHERE id = ?", [JSON.stringify(results), today, 1], function (tx, res) {
                                        //alert("Dataset updated.");
                                        //$.growl({ title: "Changes Saved!", message: "Your changes have been saved!", location: "bc", size: "large", fixed: "true" });
                                    });
                                }, function (err) {
                                    $.growl({ title: "Application Error", message: "An error occured while updating data to DB. " + err.message, location: "bc", size: "large", fixed: "true" });
                                });
                                //$.growl({ title: "Application Info", message: "Data loaded!", location: "bc", size: "large", fixed: "true" });
                            },
                            failure: function () {
                                $.growl({ title: "Application Error", message: "Error!", location: "bc", size: "large", fixed: "true" });
                            }
                        });
                        google.maps.event.addListener(map, 'click', function (event) {
                            placeMarker(event.latLng);
                        });
                        //google.maps.event.addListener(map, 'dblclick', function (event) {
                        //    map.setZoom(curZoom + 1);
                        //});
                        //google.maps.event.addListener(map, 'click', function (event) {
                        //    map.setZoom(curZoom - 1);
                        //});
                    },
                    failure: function () {
                        $.growl({ title: "Application Error", message: "Error loading settings!", location: "bc", size: "large", fixed: "true" });
                    }
                });
            };
        });
    }, function (err) {
        $.growl({ title: "Application Error", message: "An error occured while loading app settings. " + err.message, location: "bc", size: "large", fixed: "true" });
    });
}

function initLoad() {
    //Invoke Authentication functionality ---------------
    /* Not required for Windows platform */
    checkPermissions();
    /* Not required for Windows platform */
    initSettings();
    initAuth();
    $('#modalAuth').modal();
    //return;
    //OTP functionality ends -----------------

    //Invoke OTP functionality ---------------
    //initVerify();
    //$('#modalVerify').modal();
    //return;
    //OTP functionality ends -----------------
}

function loadMapMarkers() {
    //Read from DB
    var d;
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM observations WHERE id = ?", [1], function (tx, res) {
            if (res.rows && res.rows.length > 0) {
                results = JSON.parse(res.rows.item(0).data);
                for (var i = 0; i < results.observations.length; i++) {
                    var wkt = new Wkt.Wkt();
                    wkt.read(results.observations[i].ObservationWhereWktClob_M_S);
                    wkt.toObject();
                    var latLng = new google.maps.LatLng(wkt.toJson().coordinates[1], wkt.toJson().coordinates[0]);
                    var ti = results.observations[i].id_M_N.toString().trim() + "/" + results.observations[i].PlantDisciplineCode_M_S.toString().trim();
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: ti
                    });
                    markers.push(marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        curIdx = this.title.split("/")[0];
                        var curD = "'" + this.title.split("/")[1].toString().trim() + "'";
                        curLat = this.getPosition().lat();
                        curLng = this.getPosition().lng();
                        //curAlt = this.getPosition().altitude();
                        if (infoWindow) {
                            infoWindow.close();
                        }
                        infoWindow = new google.maps.InfoWindow({
                            content: '<div id="content"><h4>Observation ' + this.title + '</h4><div id="bodyContent">' +
                            '<i class="fa fa-pencil fa-2x text-info" onclick="launchModal(' + curIdx + ',' + curD + ')"></i><label class="text-info">Edit</label></div></div>'
                        });
                        infoWindow.setPosition(this.position);
                        infoWindow.open(map);
                        map.setCenter(this.position);
                    });
                }
            }
        });
    }, function (err) {
        $.growl({ title: "Application Error", message: "An error occured while retrieving observations. " + err.message, location: "bc", size: "large" });
    });
};

$(document).on('click', 'a.btnResetData', function (e) {
    $.confirm({
        title: 'Confirm Data Reset!',
        content: 'Do you want to delete all the observation records?',
        buttons: {
            Ok: function () {
                $.ajax({
                    method: "GET",
                    url: "data/observations1.json",
                    contentType: "json",
                    success: function (data) {
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd
                        }
                        if (mm < 10) {
                            mm = '0' + mm
                        }
                        today = dd.toString() + '/' + mm.toString() + '/' + yyyy.toString();
                        db.transaction(function (tx) {
                            tx.executeSql("DELETE FROM observations", [], function (tx, res) {
                                //alert("Rows deleted.");
                            });
                        }, function (err) {
                            $.growl({ title: "Application Error", message: "An error occured while deleting row from DB. " + err.message, location: "bc", size: "large" });
                        });
                        db.transaction(function (tx) {
                            tx.executeSql("INSERT INTO observations (id, filedt, data) VALUES (?,?,?)", [1, today, JSON.stringify(data)], function (tx, res) {
                                //alert("Row inserted.");
                            });
                        }, function (err) {
                            $.growl({ title: "Application Error", message: "An error occured while inserting row to DB. " + err.message, location: "bc", size: "large" });
                        });
                        clearMarkers();
                        results = JSON.parse(data);
                        for (var i = 0; i < results.observations.length; i++) {
                            var wkt = new Wkt.Wkt();
                            wkt.read(results.observations[i].ObservationWhereWktClob_M_S);
                            wkt.toObject();
                            var latLng = new google.maps.LatLng(wkt.toJson().coordinates[1], wkt.toJson().coordinates[0]);
                            var ti = results.observations[i].id_M_N.toString().trim() + "/" + results.observations[i].PlantDisciplineCode_M_S.toString().trim();
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                title: ti
                            });
                            markers.push(marker);
                            google.maps.event.addListener(marker, 'click', function () {
                                curIdx = this.title.split("/")[0];
                                var curD = "'" + this.title.split("/")[1].toString().trim() + "'";
                                curLat = this.getPosition().lat();
                                curLng = this.getPosition().lng();
                                //curAlt = this.getPosition().altitude();
                                if (infoWindow) {
                                    infoWindow.close();
                                }
                                infoWindow = new google.maps.InfoWindow({
                                    content: '<div id="content"><h4>Observation ' + this.title + '</h4><div id="bodyContent">' +
                                    '<i class="fa fa-pencil fa-2x text-info" onclick="launchModal(' + curIdx + ',' + curD + ')"></i><label class="text-info">Edit</label></div></div>'
                                });
                                infoWindow.setPosition(this.position);
                                infoWindow.open(map);
                                map.setCenter(this.position);
                            });
                        }
                        db.transaction(function (tx) {
                            tx.executeSql("UPDATE observations SET data = ?,filedt = ? WHERE id = ?", [JSON.stringify(results), today, 1], function (tx, res) {
                                //alert("Dataset updated.");
                                //$.growl({ title: "Changes Saved!", message: "Your changes have been saved!", location: "bc", size: "large" });
                            });
                        }, function (err) {
                            $.growl({ title: "Application Error", message: "An error occured while updating data to DB. " + err.message, location: "bc", size: "large" });
                        });
                        $.growl({ title: "Application Info", message: "Data reset complete!", location: "bc", size: "large" });
                    },
                    failure: function () {
                        $.growl({ title: "Application Error", message: "Error!", location: "bc", size: "large" });
                    }
                });
            },
            cancel: function () {
                //close
            }
        }
    });
});

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function checkMapBoundsByLoc(location) {
    var nM = new google.maps.Marker({
        position: location,
        map: map
    });
    var cLat = nM.getPosition().lat();
    var cLng = nM.getPosition().lng();
    var arr = resSettings.settings.mapSets.filter(function (el) {
        return (el.activeFlag === 1);
    });
    if (cLat < arr[0].mapBounds.bottomLat || cLat > arr[0].mapBounds.topLat || cLng < arr[0].mapBounds.leftLng || cLng > arr[0].mapBounds.rightLng) {
        $.growl({ title: "Out of bounds!", message: "Location is outside map bounds!", location: "bc", size: "large" });
        nM.setMap(null);
        return false;
    }
    nM.setMap(null);
    return true;
}

function checkMapBoundsByPos(position) {
    var cLat = position.coords.latitude;
    var cLng = position.coords.longitude;
    var arr = resSettings.settings.mapSets.filter(function (el) {
        return (el.activeFlag === 1);
    });
    if (cLat < arr[0].mapBounds.bottomLat || cLat > arr[0].mapBounds.topLat || cLng < arr[0].mapBounds.leftLng || cLng > arr[0].mapBounds.rightLng) {
        $.growl({ title: "Out of bounds!", message: "Location is outside map bounds!", location: "bc", size: "large" });
        return false;
    }
    return true;
}

function checkMapBoundsBySite(position, siteId) {
    var arr = siteData.filter(function (el) {
        return (el.id === siteId);
    });
    if (arr) {
        var wkt = new Wkt.Wkt();
        wkt.read(arr[0].locationDatum.wkt);
        wkt.toObject();
        var boundarydata = new Array();
        for (var i = 0; i < wkt.toJson().coordinates[0].length; i++) {
            boundarydata[i] = new google.maps.LatLng(wkt.toJson().coordinates[0][1].Ua, wkt.toJson().coordinates[0][0].Va);
        }
        sitePolygon = new google.maps.Polygon({
            path: boundarydata,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'Red',
            fillOpacity: 0.4
        });
        map.setCenter(boundarydata[0]);
        sitePolygon.setMap(map);

        var cLat = position.coords.latitude;
        var cLng = position.coords.longitude;
        var point = new google.maps.LatLng(cLat, cLng);

        if (sitePolygon.Contains(point)) {
            return true;
        }
        else {
            $.growl({ title: "Out of bounds!", message: "Location is outside site bounds!", location: "bc", size: "large" });
            return false;
        }

    }
    else {
        $.growl({ title: "Out of bounds!", message: "Location is outside site bounds!", location: "bc", size: "large" });
        return false;
    }
}

function placeMarker(location) {
    newMarker = new google.maps.Marker({
        position: location,
        map: map
    });
    curLat = newMarker.getPosition().lat();
    curLng = newMarker.getPosition().lng();
    curWkt = "POINT (" + curLng.toFixed(5) + " " + curLat.toFixed(5) + ")";
    //curAlt = newMarker.getPosition().altitude();
    if (!checkMapBoundsByLoc(location)) {
        newMarker.setMap(null);
    }
    else {
        curIdx = -1;
        switch (AppMode) {
            case 'IAH':
                $('#modalMenu').modal();
                break;
            case 'AH':
                $('#modalAHMenu').modal();
                break;
            case 'PH':
                $('#modalPHMenu').modal();
                break;
        };
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};

function myLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            if (checkMapBoundsByPos(position)) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                map.setZoom(11);
                map.setCenter(pos);
                $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue'
                });
                placeMarker(pos);
            }
        }, function () {
            $.growl({ title: "Out of bounds!", message: "GPS GetCurrentPosition Failed!", location: "bc", size: "large" });
        });
    } else {
        // Browser doesn't support Geolocation
        $.growl({ title: "Out of bounds!", message: "Geolocation Failed!", location: "bc", size: "large" });
    }
};

function getAltitude() {
    //var t0, t1;
    //t0 = performance.now();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //$('#form1').find("input[type='text'][name='latitude']").val(position.coords.latitude);
            //$('#form1').find("input[type='text'][name='longitude']").val(position.coords.longitude);
            //alert(position.coords.altitude);
            $('#form1').find("input[type='number'][name^='AltitudeNo']").val(position.coords.altitude.toFixed(5));
        }, function () {
            $.growl({ title: "Application Error", message: "GetAltitude Failed on this platform.", location: "bc", size: "large" });
        });
    } else {
        // Browser doesn't support Geolocation
        $.growl({ title: "Application Error", message: "GeoLocation Failed.", location: "bc", size: "large" });
    };
    //t1 = performance.now();
    //$('#perfTime').html("<i class='fa fa-clock-o text-info'></i>" + Math.round((t1 - t0)) + " ms");
};

function downloadCSV() {
    $('#mt1').text('All Observations');
    switch (AppMode) {
        case "IAH":
            $('#modalGrid').modal();
            break;
        case "AH":
            $('#modalGrid').modal();
            break;
        case "PH":
            $('#modalPHGrid').modal();
            break;
        default:
            break;
    }
};

function launchModal(e, f) {
    curIdx = e;
    curDiscipline = f;
    switch (f) {
        case 0:
            loadModal('mo_sngObservation');
            break;
        case 1:
            loadModal('mo_grpObservation');
            break;
        case 'B':
            loadModal('mo_BotObservation');
            break;
        case 'E':
            loadModal('mo_EntObservation');
            break;
        case 'P':
            loadModal('mo_PatObservation');
            break;
    }
    $('#modalForm').modal();
};

function loadData() {
    var data;
    var tab;
    switch (AppMode) {
        case "IAH":
            data = jQuery.grep(results.observations, function (n, i) {
                return (n.PlantDisciplineCode === 'S');
            });
            table = $('#srchTable').DataTable({
                "data": data,
                "columns": [
                    { "data": "surveillanceActivity" },
                    { "data": "commonName" },
                    {
                        "data": "sDate",
                        "render": function (data, type, row, meta) {
                            return moment(data).format("DD/MM/YYYY");
                        }
                    },
                    { "data": "latitude" },
                    { "data": "longitude" },
                    { "data": "datum" },
                    { "data": "id" },
                    {
                        "data": "status",
                        "render": function (data, type, row, meta) {
                            if (data == 0) return "Saved";
                            if (data == 1) return "Submitted";
                        }
                    },
                    {
                        "data": "discipline",
                        "render": function (data, type, row, meta) {
                            if (data == 'S') return "Single";
                            if (data == 'G') return "Group";
                            if (data == 'B') return "Botany";
                            if (data == 'E') return "Entomology";
                            if (data == 'P') return "Pathology";
                        }
                    }
                ],
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": false
            });
            break;
        case "AH":
            data = jQuery.grep(results.observations, function (n, i) {
                return (n.PlantDisciplineCode === 'S' || n.PlantDisciplineCode === 'G');
            });
            table = $('#srchTable').DataTable({
                "data": data,
                "columns": [
                    { "data": "surveillanceActivity" },
                    { "data": "commonName" },
                    {
                        "data": "sDate",
                        "render": function (data, type, row, meta) {
                            return moment(data).format("DD/MM/YYYY");
                        }
                    },
                    { "data": "latitude" },
                    { "data": "longitude" },
                    { "data": "datum" },
                    { "data": "id" },
                    {
                        "data": "status",
                        "render": function (data, type, row, meta) {
                            if (data == 0) return "Saved";
                            if (data == 1) return "Submitted";
                        }
                    },
                    {
                        "data": "discipline",
                        "render": function (data, type, row, meta) {
                            if (data == 'S') return "Single";
                            if (data == 'G') return "Group";
                            if (data == 'B') return "Botany";
                            if (data == 'E') return "Entomology";
                            if (data == 'P') return "Pathology";
                        }
                    }
                ],
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": false
            });
            break;
        case "PH":
            data = jQuery.grep(results.observations, function (n, i) {
                return (n.PlantDisciplineCode_M_S === 'P' || n.PlantDisciplineCode_M_S === 'E' || n.PlantDisciplineCode_M_S === 'B');
            });
            table = $('#srchPHTable').DataTable({
                "data": data,
                "columns": [
                    { "data": "id_M_N" },
                    {
                        "data": "PlantDisciplineCode_M_S",
                        "render": function (data, type, row, meta) {
                            if (data == 'S') return "Single";
                            if (data == 'G') return "Group";
                            if (data == 'B') return "Botany";
                            if (data == 'E') return "Entomology";
                            if (data == 'P') return "Pathology";
                        }
                    },
                    { "data": "SurvActivityId_M_N" },
                    { "data": "SiteId_O_N" },
                    {
                        "data": "ObservationDate_M_D",
                        "render": function (data, type, row, meta) {
                            return moment(data).format("YYYY-MM-DD");
                        }
                    },
                    { "data": "WaypointNumber_O_N" },
                    { "data": "ObservationWhereWktClob_M_S" },
                    { "data": "ObservWhereGpsDatumId_M_S" },
                    {
                        "data": "status_M_N",
                        "render": function (data, type, row, meta) {
                            if (data == 0) return "Saved";
                            if (data == 1) return "Submitted";
                        }
                    }
                ],
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": false
            });
            break;
        default:
            data = results.observations;
    }
    //table.column(10).visible(false);
};

function exportTableToCSV($table, filename) {
    csv = "";
    var $rows = $table.find('tr:has(td)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row),
                $cols = $row.find('td');

            return $cols.map(function (j, col) {
                var $col = $(col),
                    text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"';

    window.resolveLocalFileSystemURL('file:///storage/emulated/0/Download', function (fs) {
        //alert('file system open: ' + fs);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy.toString() + mm.toString() + dd.toString();
        fs.getFile("sample" + today + ".csv", { create: true, exclusive: false }, function (fileEntry) {
            //alert("fileEntry is file?" + fileEntry.isFile.toString());
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function () {
                    //alert("Successful file read...");
                    //readFile(fileEntry);
                };
                fileWriter.onerror = function (e) {
                    $.growl({ title: "Application Error", message: "Failed file read: " + e.toString(), location: "bc", size: "large" });
                };
                fileWriter.seek(0);
                var blob = new Blob([csv], { type: 'text/plain' });
                fileWriter.write(blob);
                $.growl({ title: "Application Info", message: 'File saved to Download folder.', location: "bc", size: "large" });
            });
        });
    });
};


function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        if (formArray[i]['name'].length > 0) {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
    }
    return returnArray;
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

function BindAutoComplete() {
    function log(message) {
        //$("<div>").text(message).prependTo("#log");
        //$("#log").scrollTop(0);
    }
    $(".taxonText").autocomplete({
        source: function (request, response) {
            var names = [];
            $.ajax({
                url: "http://ag-bie.ala.org.au/ws/auto",
                dataType: "json",
                data: {
                    q: request.term,
                    limit: 100
                },
                success: function (data) {
                    $.each(data.autoCompleteList, function () {
                        if (this.name) {
                            names.push(this.matchedNames[0]);
                        }
                        else {
                            names.push('Not Defined');
                        }
                    });
                    response(names);
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            log(ui.item ?
                "Selected: " + ui.item.label :
                "Nothing selected, input was " + this.value);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
};

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

$(document).on('click', '#Save', function (e) {
    //var obj = JSON.stringify(objectifyForm(form1));
    console.log(JSON.stringify(objectifyPHFormforSave(form1)));
    var obj = objectifyPHFormforSave(form1);
    obj.status_M_N = 0;
    if (curIdx > 0) {
        results.observations[curIdx - 1] = obj;
    }
    else {
        //console.log(JSON.stringify(obj));
        results.observations.push(obj);
        //curIdx = results.observations.length;
    }
    db.transaction(function (tx) {
        tx.executeSql("UPDATE observations SET data = ? WHERE id = ?", [JSON.stringify(results), 1], function (tx, res) {
            //alert("Dataset updated.");
            $.growl({ title: "Changes Saved!", message: "Your changes have been saved!", location: "bc", size: "large" });
        });
    }, function (err) {
        $.growl({ title: "Application Error", message: "An error occured while updating row to DB. " + err.message, location: "bc", size: "large" });
    });
    //$('#modalForm').modal('hide');
    //clearMarkers();
    //loadMapMarkers();
    //if (infoWindow) {
    //    infoWindow.close();
    //}
});

$(document).on('click', '#SaveExit', function (e) {
    //var obj = JSON.stringify(objectifyForm(form1));
    console.log(JSON.stringify(objectifyPHFormforSave(form1)));
    //console.log(curIdx);
    var obj = objectifyPHFormforSave(form1);
    obj.status_M_N = 0;
    if (curIdx > 0) {
        results.observations[curIdx - 1] = obj;
    }
    else {
        results.observations.push(obj);
        //curIdx = results.observations.length;
    }
    db.transaction(function (tx) {
        tx.executeSql("UPDATE observations SET data = ? WHERE id = ?", [JSON.stringify(results), 1], function (tx, res) {
            $.growl({ title: "Changes Saved!", message: "Your changes have been saved!", location: "bc", size: "large" });
            //alert("Dataset updated.");
        });
    }, function (err) {
        $.growl({ title: "Application Error", message: "An error occured while updating row to DB. " + err.message, location: "bc", size: "large" });
    });
    $('#modalForm').modal('hide');
    clearMarkers();
    loadMapMarkers();
    if (infoWindow) {
        infoWindow.close();
    }
});

$(document).on('click', '#Submit2', function (e) {
    var rowsFailedErr = [];
    vError = 0;
    vErrDescription = [];
    vFailed = false;
    HostStatCountFlag = 0;
    HostStatAreaFlag = 0;
    PathTargetObservedCodeFlag = 0;
    var obj = objectifyPHFormforSave(form1);
    console.log(JSON.stringify(obj));
    var result = Iterate(obj);
    if (result.vError == 0) {
        //console.log(JSON.stringify(SubmitRecord(objectifyPHFormforSubmit(obj))));
        obj.status_M_N = 1;
        if (curIdx > 0) {
            results.observations[curIdx - 1] = obj;
        }
        else {
            results.observations.push(obj);
        }
        db.transaction(function (tx) {
            tx.executeSql("UPDATE observations SET data = ? WHERE id = ?", [JSON.stringify(results), 1], function (tx, res) {
                $.growl({ title: "Submit Observations", message: "Success! Observation marked for Sync.", location: "tc", size: "large" });
            });
        }, function (err) {
            $.growl({ title: "Application Error", message: "An error occured while saving row to DB. " + err.message, location: "bc", size: "large" });
            });
        $('#modalForm').modal('hide');
        clearMarkers();
        loadMapMarkers();
        if (infoWindow) {
            infoWindow.close();
        }
    }
    else {
        rowsFailedErr.push(result.vErrDescription);
        $.growl({ title: "Submit Observations", message: "Submit Failed!<br/>Errors:<br/>" + rowsFailedErr.join('<br/>'), location: "tc", size: "large" }); 
    }
});

$(document).on('click', '#settings', function (e) {
    $.ajax({
        url: "",
        beforeSend: function (xhr) {
            $('#modalProgress').modal();
            $('#mb6 .progText').text("Loading ...");
            $('#mb5').empty();
            $('#mt5').empty();
            $(document).find('script[id="pageScript"]').remove();
            $('#mb5').load('settings.html');
            t0 = performance.now();
        }
    })
        .complete(function (e) {
            $('#mb5').find('#appMode').val(AppMode);
            var arr = resSettings.settings.mapSets.filter(function (el) {
                return (el.activeFlag === 1);
            });
            $('#form3').find('input[name="optMaps"][data-id="' + (arr[0].mapsetID - 1) + '"]').iCheck('check');
        }).done(function () {
            $('#modalProgress').modal('hide');
        });
    $('#modalSettings').modal();
});

$(document).on('click', '#zplus', function (e) {
    map.setZoom(curZoom + 1);
});

$(document).on('click', '#zminus', function (e) {
    map.setZoom(curZoom - 1);
});

$(document).on('click', '#Delete', function (e) {
    $.confirm({
        title: 'Delete Observation?',
        content: 'Do you want to delete this observation?',
        buttons: {
            Ok: function () {
                results.observations.splice(curIdx - 1, 1);
                db.transaction(function (tx) {
                    tx.executeSql("UPDATE observations SET data = ? WHERE id = ?", [JSON.stringify(results), 1], function (tx, res) {
                        //alert("Dataset updated.");
                    });
                }, function (err) {
                    $.growl({ title: "Application Error", message: "An error occured while updating row to DB. " + err.message, location: "bc", size: "large" });
                });
                $('#modalForm').modal('hide');
                //table.destroy();
                //loadData();
                clearMarkers();
                loadMapMarkers();
            },
            cancel: function () {
                //close
            }
        }
    });
});

$(document).on('click', '#srchTable tbody tr', function () {
    var t0, t1;
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    var d = table.row(this).data();
    curIdx = d.id;
    curDiscipline = d.PlantDisciplineCode;
    $.ajax({
        url: "",
        beforeSend: function (xhr) {
            t0 = performance.now();
            $('#modalProgress').modal();
            $('#mb6 .progText').text("Loading ...");
        }
    })
        .complete(function (data) {
            switch (curDiscipline) {
                case "0":
                    loadModal('mo_sngObservation');
                    break;
                case "1":
                    loadModal('mo_grpObservation');
                    break;
                case "B":
                    loadModal('mo_BotObservation');
                    break;
                case "E":
                    loadModal('mo_EntObservation');
                    break;
                case "P":
                    loadModal('mo_PatObservation');
                    break;
            }
            var zi = $('#modalGrid').css('z-index');
            $('#modalForm').css('z-index', zi + 100);
            $('#modalForm').modal();
        }).done(function () {
            $('#modalProgress').modal('hide');
            $('#modalGrid').modal('hide');
            t1 = performance.now();
            $('#perfTime').html("<i class='fa fa-clock-o text-info'></i>" + Math.round((t1 - t0)) + " ms");
        });
});

$(document).on('click', '#srchPHTable tbody tr', function () {
    var t0, t1;
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    var d = table.row(this).data();
    curIdx = d.id_M_N;
    curDiscipline = d.PlantDisciplineCode_M_S;
    $.ajax({
        url: "",
        beforeSend: function (xhr) {
            t0 = performance.now();
            $('#modalProgress').modal();
            $('#mb6 .progText').text("Loading ...");
        }
    })
        .complete(function (data) {
            switch (curDiscipline) {
                case "0":
                    loadModal('mo_sngObservation');
                    break;
                case "1":
                    loadModal('mo_grpObservation');
                    break;
                case "B":
                    loadModal('mo_BotObservation');
                    break;
                case "E":
                    loadModal('mo_EntObservation');
                    break;
                case "P":
                    loadModal('mo_PatObservation');
                    break;
            }
            var zi = $('#modalPHGrid').css('z-index');
            $('#modalForm').css('z-index', zi + 100);
            $('#modalForm').modal();
        }).done(function () {
            $('#modalProgress').modal('hide');
            $('#modalPHGrid').modal('hide');
            t1 = performance.now();
            $('#perfTime').html("<i class='fa fa-clock-o text-info'></i>" + Math.round((t1 - t0)) + " ms");
        });
});

$(document).on('click', '.export', function (event) {
    var args = [$('#srchTable_wrapper'), 'export.csv'];
    exportTableToCSV.apply(this, args);
});

$(document).on('click', '.sync', function (event) {
    var success = true;
    var rowsFailed = [];
    var rowsFailedErr = [];
    var rowsSuccess = [];
    $.each(results.observations, function (index, value) {
        if (value.status_M_N == 0) { return true };
        vError = 0;
        vErrDescription = [];
        vFailed = false;
        HostStatCountFlag = 0;
        HostStatAreaFlag = 0;
        PathTargetObservedCodeFlag = 0;
        var rowid = value.id_M_N;
        var result = Iterate(value);
        if (result.vError == 0) {
            console.log(JSON.stringify(SubmitRecord(objectifyPHFormforSubmit(value))));
            rowsSuccess.push(rowid);
            //$.ajax({
            //    method: "POST",
            //    url: "http://ec2-52-65-97-167.ap-southeast-2.compute.amazonaws.com:8081/gateway/grpObservations/add",
            //    data: JSON.stringify(value),
            //    contentType: "application/json",
            //    dataType: "json",
            //    success: function () {
            //        //$.growl({ title: "Apply Changes", message: "Success! Observations synced to cloud.", location: "bc", size: "large" });
            //    },
            //    complete: function () {
            //        //$.growl({ title: "Apply Changes", message: "Success! Observations synced to cloud.", location: "bc", size: "large" });
            //    },
            //    failure: function () {
            //        $.growl.error({ message: "Sync - Failed!" });
            //    }
            //});
        }
        else {
            rowsFailed.push(rowid);
            rowsFailedErr.push(result.vErrDescription);
            success = false;
            return false;
        }
    });
    if (success == true) { $.growl({ title: "Submit Observations", message: "Success! Observations " + rowsSuccess.join(',') + " synced to cloud.", location: "tc", size: "large", fixed: "true" }) }
    else { $.growl({ title: "Submit Observations", message: "Submit Failed for rows:" + rowsFailed.join(',') + "<br/>Errors:<br/>" + rowsFailedErr.join('<br/>'), location: "tc", size: "large", fixed: "true" }); }
});

$(document).on('shown.bs.modal', '#modalPHGrid', function () {
    loadPHDefaults();
    loadData();
});

$(document).on('hidden.bs.modal', '#modalPHGrid', function () {
    table.destroy();
});

$(document).on('shown.bs.modal', '#modalGrid', function () {
    loadAHDefaults();
    loadData();
});

$(document).on('hidden.bs.modal', '#modalGrid', function () {
    table.destroy();
});

$(document).on('hidden.bs.modal', '#modalForm', function () {
    //table.destroy();
    //loadAHDefaults();
    //loadData();
    clearMarkers();
    loadMapMarkers();
});

$(document).ready(function () {
    $('.modal-body').height($(window).height() / 1.36);
    $('.datetimepicker').datetimepicker({
        format: 'd-MMM-YYYY hh:mm Z',
        defaultDate: Date.now()
    });
    $('.datepicker').datepicker({
        format: 'd-MMM-YYYY hh:mm Z',
        todayHighlight: true,
        autoclose: true
    });
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    });
});

$(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

function doneResizing() {
    $('.modal-body').height($(window).height() / 1.36);
}

$(document).on('click', '.obsForm', function (e) {
    $('.obsForm').removeClass('bg-Obs');
    $(this).addClass('bg-Obs');
    curDiscipline = $(this).find('input[type=radio][name="optObs"]').attr('data-discipline');
    $(this).find('input[type="radio"].minimal').iCheck('check');
});

$(document).on('click', '#showFormPH', function (e) {
    var zi;
    var formName = $("input[name='optObs']:checked").val();
    if (formName) {
        zi = $('#modalPHMenu').css('z-index');
        $('#modalForm').css('z-index', zi + 100);
        loadModal(formName);
        $('#modalForm').modal();
        $('#modalPHMenu').modal('hide');
    }
});

$(document).on('hidden.bs.modal', '#modalForm', function () {
    if (newMarker && (curIdx === -1 || curIdx === -2)) {
        newMarker.setMap(null);
    }
});

$(document).on('hidden.bs.modal', '#modalPHMenu', function () {
    if (newMarker && (curIdx === -1 || curIdx === -2)) {
        newMarker.setMap(null);
    }
});

$(document).on('click', '#btnData', function () {
    $('#postedData').toggleClass('hide');
});

$(document).on('change', 'input:checkbox', function (e) {
    e.preventDefault();
    if ($(this).is(":checked")) {
        $(this).val('Y');
    } else {
        $(this).val('N');
    }
});

$(document).on('click', '#newObservation', function () {
    curIdx = -2;
    switch (AppMode) {
        case 'IAH':
            $('#modalMenu').modal();
            break;
        case 'AH':
            $('#modalAHMenu').modal();
            break;
        case 'PH':
            var zi = $('#modalPHGrid').css('z-index');
            $('#modalPHMenu').css('z-index', zi + 100);
            $('#modalPHMenu').modal();
            $('#modalPHGrid').modal('hide');
            break;
    };
});

$(document).on('click', 'a.btnBackupData', function (e) {
    backupDatabase();
});

$(document).on('click', 'a.btnRestoreData', function (e) {
    restoreDatabase();
});

function backupDatabase() {
    var fileName = cordova.file.applicationStorageDirectory + 'databases/sims.db';
    var directoryName = cordova.file.externalRootDirectory;

    window.resolveLocalFileSystemURL(fileName, function (fileEntry) {
        console.log('[!] Database exists: ' + fileName);
        console.log('[!] Storage: ' + directoryName);
        window.resolveLocalFileSystemURL(directoryName, function (directoryEntry) {
            console.log('[!] Directory: ' + directoryEntry.toURL());
            directoryEntry.getDirectory("Backup", { create: true, exclusive: false }, function (bkupdirectoryEntry) {
                console.log('[!] Directory: ' + bkupdirectoryEntry.toURL());
                fileEntry.copyTo(bkupdirectoryEntry, name, function (cpfileEntry) {
                    console.log('[!] Copy success');
                    $.growl({ title: "Backup Success", message: "Observations backedup to local Backup folder.", location: "bc", size: "large" });
                }, function (error) {
                    console.log('[!] Copy failed: ' + error.code);
                });
            }, function (error) {
                console.log('[!] Backup Directory not found: ' + directoryName + 'Backup' + ' errorcode: ' + + error.code);
            })
        }, function (error) {
            console.log('[!] Directory not found: ' + directoryName + ' errorcode: ' + + error.code);
        });
    }, function (error) {
        console.log('[!] Database not found: ' + fileName + ' errorcode: ' + + error.code);
    });
}

function restoreDatabase() {
    $.confirm({
        title: 'Confirm Data Restore!',
        content: 'Do you want to restore from backup? You may lose few observations that were recorded after the last backup!',
        buttons: {
            Ok: function () {
                var fileName = cordova.file.externalRootDirectory + 'Backup/sims.db';
                var directoryName = cordova.file.applicationStorageDirectory + 'databases';

                window.resolveLocalFileSystemURL(fileName, function (fileEntry) {
                    console.log('[!] Database exists: ' + fileName);
                    console.log('[!] Storage: ' + directoryName);
                    window.resolveLocalFileSystemURL(directoryName, function (directoryEntry) {
                        console.log('[!] Directory: ' + directoryEntry.toURL());
                        directoryEntry.getDirectory("Backup", { create: true, exclusive: false }, function (bkupdirectoryEntry) {
                            console.log('[!] Directory: ' + bkupdirectoryEntry.toURL());
                            fileEntry.copyTo(bkupdirectoryEntry, name, function (cpfileEntry) {
                                console.log('[!] Copy success');
                                $.growl({ title: "Restore Success", message: "Observations restored to the application.", location: "bc", size: "large" });
                            }, function (error) {
                                console.log('[!] Copy failed: ' + error.code);
                            });
                        }, function (error) {
                            console.log('[!] Restore Directory not found: ' + directoryName + 'Backup' + ' errorcode: ' + + error.code);
                        })
                    }, function (error) {
                        console.log('[!] Directory not found: ' + directoryName + ' errorcode: ' + + error.code);
                    });
                }, function (error) {
                    console.log('[!] Database not found: ' + fileName + ' errorcode: ' + + error.code);
                });
            },
            cancel: function () {
                //close
            }
        }
    });
}

google.maps.Polygon.prototype.Contains = function (point) {
    var crossings = 0,
        path = this.getPath();

    // for each edge
    for (var i = 0; i < path.getLength(); i++) {
        var a = path.getAt(i),
            j = i + 1;
        if (j >= path.getLength()) {
            j = 0;
        }
        var b = path.getAt(j);
        if (rayCrossesSegment(point, a, b)) {
            crossings++;
        }
    }

    // odd number of crossings?
    return (crossings % 2 == 1);

    function rayCrossesSegment(point, a, b) {
        var px = point.lng(),
            py = point.lat(),
            ax = a.lng(),
            ay = a.lat(),
            bx = b.lng(),
            by = b.lat();
        if (ay > by) {
            ax = b.lng();
            ay = b.lat();
            bx = a.lng();
            by = a.lat();
        }
        // alter longitude to cater for 180 degree crossings
        if (px < 0) {
            px += 360;
        }
        if (ax < 0) {
            ax += 360;
        }
        if (bx < 0) {
            bx += 360;
        }

        if (py == ay || py == by) py += 0.00000001;
        if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
        if (px < Math.min(ax, bx)) return true;

        var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Infinity;
        var blue = (ax != px) ? ((py - ay) / (px - ax)) : Infinity;
        return (blue >= red);

    }

};