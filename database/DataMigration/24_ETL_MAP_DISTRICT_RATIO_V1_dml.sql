BEGIN TRANSACTION

DECLARE @utcdate DATETIME = (SELECT getutcdate() AS utcdate)
DECLARE @app_guid UNIQUEIDENTIFIER = (SELECT CASE WHEN SUSER_SID() IS NOT NULL THEN SUSER_SID() ELSE (SELECT CONVERT(uniqueidentifier,STUFF(STUFF(STUFF(STUFF('B00D00A0AC0A0D0C00DD00F0D0C00000',9,0,'-'),14,0,'-'),19,0,'-'),24,0,'-'))) END AS  app_guid)
DECLARE @app_user VARCHAR(30) = (SELECT CASE WHEN SUBSTRING(SUSER_NAME(),CHARINDEX('\',SUSER_NAME())+1,LEN(SUSER_NAME())) IS NOT NULL THEN SUBSTRING(SUSER_NAME(),CHARINDEX('\',SUSER_NAME())+1,LEN(SUSER_NAME())) ELSE CURRENT_USER END AS app_user)
DECLARE @app_user_dir VARCHAR(12) = (SELECT CASE WHEN LEN(SUBSTRING(SUSER_NAME(),0,CHARINDEX('\',SUSER_NAME(),0)))>1 THEN SUBSTRING(SUSER_NAME(),0,CHARINDEX('\',SUSER_NAME(),0)) ELSE 'WIN AUTH' END AS app_user_dir)

DECLARE @ratioType int;
SELECT @ratioType = CODE_LOOKUP_ID FROM CRT_CODE_LOOKUP WHERE CODE_SET = 'RATIO_RECORD_TYPE' AND CODE_NAME = 'District'

INSERT INTO CRT_RATIO
	(PROJECT_ID
	,RATIO
	, RATIO_RECORD_TYPE_LKUP_ID
	,DISTRICT_ID
	,APP_CREATE_USERID
	,APP_CREATE_TIMESTAMP
	,APP_CREATE_USER_GUID
	,APP_LAST_UPDATE_USERID
	,APP_LAST_UPDATE_TIMESTAMP
	,APP_LAST_UPDATE_USER_GUID)
SELECT mp.CRT_ID AS PROJECT_ID
	 , Ratio AS RATIO
	 , @ratioType
	 , md.CRT_ID AS DISTRICT_ID
	 , @app_user
	 , @utcdate
	 , @app_guid
	 , @app_user
	 , @utcdate
	 , @app_guid
FROM tblDistrictRatios tdr
JOIN MAP_PROJECT mp
ON mp.LEGACY_ID = tdr.Project
JOIN MAP_DISTRICT md
on md.LEGACY_ID = tdr.District

COMMIT
GO

DECLARE @legacyCnt int, @crtCnt int, @mappedCnt int;

SELECT @legacyCnt = COUNT(*) FROM tblDistrictRatios WHERE District IS NOT NULL AND Project IS NOT NULL
SELECT @crtCnt = COUNT(*) FROM CRT_RATIO WHERE DISTRICT_ID IS NOT NULL

PRINT CHAR(10) + 'Found ' + CONVERT(varchar, @legacyCnt) + ' Legacy District Ratios and ' + CONVERT(varchar, @crtCnt) + ' CRT District Ratio items'
