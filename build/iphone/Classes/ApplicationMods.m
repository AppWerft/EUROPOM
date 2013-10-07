#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"quickpdf",@"name",@"com.kuchbee.quickpdf",@"moduleid",@"2.0",@"version",@"a97319c8-02c2-4b1f-944b-967f24a6ebb7",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end